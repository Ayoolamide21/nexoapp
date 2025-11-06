<?php

// app/Models/LoanApplication.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'amount_requested',
        'term',
        'interest_rate',
        'status',
        'decision_date',
    ];

    /**
     * The user who applied for the loan.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The plan (loan product) this application is based on.
     */
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    /**
     * Scope to filter by status.
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
