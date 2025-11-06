<?php

// app/Models/UserProfile.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'country',
        'first_name',
        'last_name',
        'address',
        'city',
        'postal_code',
        'employment_status',
        'source_of_funds',
        'source_of_crypto',
        'industry',
        'total_wealth',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
