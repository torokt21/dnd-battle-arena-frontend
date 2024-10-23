<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Scene extends Model
{
    public $fillable = [
        'name',
        'description',
        'background',
    ];

    public function entities(): BelongsToMany
    {
        return $this->belongsToMany(Entity::class);
    }

    public static function booted()
    {
        static::deleting(function ($scene) {
            // TODO delete file
        });
    }
}
