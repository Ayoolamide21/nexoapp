<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HelpArticle extends Model
{
    // Allow mass assignment for these fields
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
    ];

    // Optional: customize the table name if it's not default 'help_articles'
    // protected $table = 'help_articles';
}
