<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\LoyaltyPoint;
use PragmaRX\Google2FA\Google2FA;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $google2fa;

    public function __construct(Google2FA $google2fa)
    {
        $this->google2fa = $google2fa;
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $profileData = $request->validate([
            'country' => 'nullable|string|max:255',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'employment_status' => 'nullable|string|max:255',
            'source_of_funds' => 'nullable|string|max:255',
            'source_of_crypto' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'total_wealth' => 'nullable|string|max:255',
        ]);

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $profileData
        );

        return response()->json(['message' => 'Profile updated successfully']);
    }
    public function referralInfo()
    {
        $user = User::findOrFail(Auth::id());

        // Referral link (adjust your frontend URL accordingly)
        $referralLink = url("/signup?ref=" . $user->referral_code);

        // Users referred by current user
        $referredUsers = User::where('referred_by', $user->id)
            ->select('id', 'name', 'email', 'created_at')
            ->get();

        // Sum of loyalty points earned from referrals
        // For example, you can store referral points with 'referral' source in LoyaltyPoint model
        $pointsEarned = LoyaltyPoint::where('user_id', $user->id)
            ->where('source', 'referral')
            ->sum('points');

        return response()->json([
            'referral_link' => $referralLink,
            'referred_users' => $referredUsers,
            'points_earned' => $pointsEarned,
            'loyalty_points' => $user->loyalty_points, // current total points
        ]);
    }
    // Enable 2FA
    public function enable2FA(Request $request)
    {
        $user = User::findOrFail(Auth::id());

        $secret = $this->google2fa->generateSecretKey();

        $user->google2fa_secret = $secret;
        // Set your 2FA enabled flag to false for now until verified:
        $user->two_factor_enabled = false;
        $user->save();

        $qrCodeUrl = $this->google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secret
        );

        $qrCode = QrCode::format('png')->size(200)->generate($qrCodeUrl);

        return response()->json([
            'qr_code' => base64_encode($qrCode),
            'secret' => $secret,
        ]);
    }

    // This method is called when user submits their token after scanning QR
    public function verify2FA(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $user = User::findOrFail(Auth::id());
        $secret = $user->google2fa_secret;

        $valid = $this->google2fa->verifyKey($secret, $request->input('token'));

        if ($valid) {
            // Set the flag to true since token is verified
            $user->two_factor_enabled = true;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => '2FA Verified Successfully!',
                'enabled' => true,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid 2FA token.',
            'enabled' => false,
        ], 400);    
    }
    public function disable2FA(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        $user->google2fa_secret = null;
        $user->two_factor_enabled = false;
        $user->save();

        return response()->json(['success' => true, 'message' => '2FA Disabled Successfully']);
    }
    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }
}
