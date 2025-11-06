<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HelpRequest extends Model
{
    protected $fillable = 
    [
        'user_id',
        'name', 
        'email', 
        'message',
        'status',
        'reply',
        
    ];

    /**
     * If the request came from a logged-in user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
