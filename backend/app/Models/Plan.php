<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'min_amount',
        'max_amount',
        'description',
        'profit_rate',
        'profit_interval',
        'duration',
        'category',
        'status',
    ];
    public function loanApplications()
    {
        return $this->hasMany(LoanApplication::class);
    }
}
