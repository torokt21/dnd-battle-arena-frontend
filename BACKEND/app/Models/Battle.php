<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Battle extends Model
{
    protected $fillable = ['scene_id'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $with = ['scene'];

    public function scene(): BelongsTo
    {
        return $this->belongsTo(Scene::class);
    }
}
