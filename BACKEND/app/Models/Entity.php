<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Entity extends Model
{
    public $fillable = [
        'name',
        'description',
        'image',
        'color',
    ];

    public function scenes(): BelongsToMany
    {
        return $this->belongsToMany(Scene::class);
    }
}
