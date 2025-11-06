<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Earning extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'plan_id',
        'amount',
        'earned_at',
    ];

    protected $dates = [
        'earned_at',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'amount' => 'decimal:2',
    ];

    // Relationships

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
