<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /* protected $fillable define los campos que pueden ser asignados en masa, 
    en este caso category */
    protected $fillable = ['category'];

    public function games()
    {
        return $this->belongsToMany(Game::class, 'category_game_list')->withPivot('onCategory')->withTimestamps();
    }
}
