<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_game_lists')->withPivot('statusCompleted', 'onList');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_game_list')->withPivot('onCategory');
    }
}
