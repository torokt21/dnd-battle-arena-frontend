<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BattleEntities extends Model
{
    protected $fillable = [
        'battle_id',
        'entity_id',
        'dead',
        'initiative',
        'x',
        'y'
    ];

    public function battle()
    {
        return $this->belongsTo(Battle::class);
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }
}
