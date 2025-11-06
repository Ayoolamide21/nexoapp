<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AI extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'interaction_type',
        'interaction_content',
        'response',
        'session_id',
        'metadata'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // AI has many transactions (transactions can be linked to plans)
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // AI has many goals through the user (user's goals can be retrieved via the AI)
    public function goals()
    {
        return $this->hasManyThrough(Goal::class, User::class);
    }

    // AI has many plans through transactions (related through the Transaction model)
    public function plans()
    {
        return $this->hasManyThrough(Plan::class, Transaction::class, 'ai_id', 'transaction_id', 'id', 'plan_id');
    }
    public function scopeLatestInteractions($query, $userId)
    {
        return $query->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();
    }

    // Get metadata as an array (if needed)
    public function getMetadataAttribute($value)
    {
        return json_decode($value, true);
    }

    // Set metadata attribute
    public function setMetadataAttribute($value)
    {
        $this->attributes['metadata'] = json_encode($value);
    }
}
