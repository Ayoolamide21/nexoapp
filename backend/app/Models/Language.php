<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'code',
        'name',
        'direction',
        'is_active',
        'is_default',
    ];

    public static function active()
    {
        return self::where('is_active', true)->get();
    }
}
