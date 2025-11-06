<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\type;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'deposit_id',
        'withdrawal_id',
        'goal_id',
        'amount',
        'starts_at',
        'ends_at',
        'status',
        'type',
        'next_profit_at',
        'total_earnings',
    ];
    protected $dates = [
        'starts_at',
        'next_profit_at',
        'ends_at',
        'created_at',
        'updated_at',
    ];
//Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
    
    public function earnings()
    {
        return $this->hasMany(Earning::class);
    }
    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
    public function withdrawal()
    {
        return $this->belongsTo(Withdrawal::class, 'withdrawal_id');
    }
}

