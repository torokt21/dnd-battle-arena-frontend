<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Scene extends Model
{
    public $fillable = [
        'name',
        'description',
        'background',
        'width',
        'height',
    ];

    public static function booted()
    {
        static::deleting(function ($scene) {
            Storage::delete($scene->background);
        });
    }
}
