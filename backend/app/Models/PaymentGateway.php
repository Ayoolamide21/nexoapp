<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentGateway extends Model
{
    protected $fillable = [
        'name',
        'public_key',
        'secret_key',
        'status',
        'environment',
        'currency',
        'logo',
    ];
}
