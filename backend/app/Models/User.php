<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'account_type',
        'business_name',
        'business_email',
        'referral_source',
        'referred_by',
        'balance',
        'otp',
        'loyalty_points',
        'status',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'api_tokens',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function earnings()
    {
        return $this->hasMany(Earning::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->referral_code)) {
                $user->referral_code = self::generateReferralCode();
            }
        });
    }

    public static function generateReferralCode()
    {
        do {
        
            $code = Str::upper(Str::random(8));
        } while (self::where('referral_code', $code)->exists());

        return $code;
    }
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function loyaltyPoints()
    {
        return $this->hasMany(LoyaltyPoint::class);
    }
    public function deposits()
    {
        return $this->hasMany(Deposit::class);
    }

    public function withdrawals()
    {
        return $this->hasMany(Withdrawal::class);
    }
    public function loanApplications()
    {
        return $this->hasMany(LoanApplication::class);
    }
}
