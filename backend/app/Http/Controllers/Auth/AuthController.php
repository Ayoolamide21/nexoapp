<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Google2FA;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    protected $google2fa;

    public function __construct(Google2FA $google2fa)
    {
        $this->google2fa = $google2fa;
    }

    // Register new user
    public function register(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'account_type' => 'required|string|in:personal,business',
            'business_name' => 'required_if:account_type,business|nullable|string|max:255',
            'business_email' => 'required_if:account_type,business|nullable|email|max:255',
            'referral_source' => 'nullable|string|max:255',
            'referral_code' => 'nullable|string|exists:users,referral_code',
            'otp' => 'nullable|digits:6',
        ]);

        $referrer = $request->filled('referral_code') ? User::where('referral_code', $request->referral_code)->first()
            : null;

        // Check if validation fails
        if ($validator->fails()) {

            // Return a JSON response with the validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }
        $otp = rand(100000, 999999);
        // Create the user
        try {
            // After validation passes
            $businessName = $request->account_type === 'business' ? trim($request->business_name) : null;
            $businessEmail = $request->account_type === 'business' ? trim($request->business_email) : null;

            $user = User::create([
                'name' => $request->username,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'account_type' => $request->account_type,
                'business_name' => $businessName,
                'business_email' => $businessEmail,
                'referral_source' => $request->referral_source,
                'referred_by' => $referrer ? $referrer->id : null,
                'referral_code' => User::generateReferralCode(),
                'otp' => $otp,
            ]);

            // Send OTP via email
            sendTransactionMail(
                $user,               // recipient user
                $otp,                // treat OTP as "transaction" value
                'otp',               // type
                'Email Verification', // subject
                "Your OTP code is: $otp" // email body / title
            );

            // Return response with user data and token
            $settings = applyMailSettings();
            $appName = $settings['app.site_name'];

            $token = $user->createToken($appName)->plainTextToken;


            return response()->json([
                'message' => 'Registration successful!',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function verifyEmailOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
        ]);

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(['message' => 'Invalid OTP.'], 422);
            }

            if ($user->email_verified_at) {
                return response()->json(['message' => 'Email already verified.'], 200);
            }

            if ((string) $user->otp !== (string) $request->otp) {
                return response()->json(['message' => 'Invalid OTP.'], 422);
            }

            $user->email_verified_at = now();
            $user->otp = null;
            $user->save();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function resendVerificationOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $otp = rand(100000, 999999);
        $user->otp = $otp;
        $user->save();

        // Send OTP email (using simple mail)

        sendTransactionMail($user, $otp, 'otp', 'Email Verification', "Your OTP code is: $otp");

        return response()->json(['message' => 'Verification email resent! Check your inbox for the OTP.']);
    }
    // Login user and create token (if using sanctum or just session)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->two_factor_enabled) {
            session(['2fa:user:id' => $user->id]);

            return response()->json([
                'two_factor_required' => true,
                'message' => 'Two-factor authentication required.',
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
    public function verify2FALogin(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $userId = session('2fa:user:id');

        if (!$userId) {
            return response()->json(['message' => 'Session expired. Please login again.'], 403);
        }

        $attempts = session('2fa_attempts', 0);
        if ($attempts >= 3) {
            session()->forget(['2fa:user:id', '2fa_attempts']);
            return response()->json(['message' => 'Too many failed attempts. Please login again.'], 429);
        }

        $user = User::find($userId);

        if (!$user || !$user->google2fa_secret) {
            return response()->json(['message' => '2FA secret not found.'], 404);
        }

        $valid = $this->google2fa->verifyKey($user->google2fa_secret, $request->token);

        if (!$valid) {
            session(['2fa_attempts' => $attempts + 1]);
            return response()->json(['message' => 'Invalid 2FA token.'], 401);
        }

        session()->forget(['2fa:user:id', '2fa_attempts']);
        Auth::login($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => '2FA login successful.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    // Logout user (revoke tokens)
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Get logged-in user info
    public function me(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile()->exists() ? $user->profile : null;

        $totalEarnings = $user->earnings()->sum('amount');

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'account_type' => $user->account_type,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'balance' => $user->balance,
            'loyalty_points' => $user->loyalty_points,
            'total_earnings' => $totalEarnings,
            'two_factor_enabled' => (bool) $user->two_factor_enabled,

            // Include profile data if it exists
            'profile' => $profile ? [
                'country' => $profile->country,
                'first_name' => $profile->first_name,
                'last_name' => $profile->last_name,
                'address' => $profile->address,
                'city' => $profile->city,
                'postal_code' => $profile->postal_code,
                'employment_status' => $profile->employment_status,
                'source_of_funds' => $profile->source_of_funds,
                'source_of_crypto' => $profile->source_of_crypto,
                'industry' => $profile->industry,
                'total_wealth' => $profile->total_wealth,
            ] : null,

        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        // Generate token and save hashed version
        $token = Str::random(64);
        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Generate reset link
        $frontendUrl = env('FRONTEND_URL', env('APP_URL'));
        $resetLink = $frontendUrl . "/reset-password?token=$token&email=" . $user->email;

        // Send reset email
        $subject = 'Reset Your Password';
        sendTransactionMail($user, $resetLink, 'password_reset', $subject);

        return response()->json([
            'message' => 'Password reset link sent! Check your email.'
        ]);
    }


    // Reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_resets')->where('email', $request->email)->first();

        if (!$record || !Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'Invalid or expired token'], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Send password change email
        $subject = 'You set a new Password';
        $title = 'Your password has been successfully updated.';

        sendTransactionMail($user, null, 'password_change', $subject, $title);

        // Delete used token
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password reset successfully']);
    }
}
