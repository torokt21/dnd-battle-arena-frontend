<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BattleEntity extends Model
{
    protected $fillable = [
        'battle_id',
        'entity_id',
        'dead',
        'initiative',
        'x',
        'y'
    ];

    protected $with = ['entity'];

    public function battle()
    {
        return $this->belongsTo(Battle::class);
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public static function placeFirstEmpty(int $battleId, int $entityId): BattleEntity
    {
        $battle = Battle::find($battleId);


        for ($x = 0; $x < $battle->scene->width; $x++) {
            for ($y = 0; $y < $battle->scene->height; $y++) {
                $entity = $battle->battleEntities->where('x', $x)->where('y', $y)->first();
                if ($entity === null) {
                    $battleEntity = new BattleEntity();
                    $battleEntity->battle_id = $battleId;
                    $battleEntity->entity_id = $entityId;
                    $battleEntity->dead = false;
                    $battleEntity->initiative = 0;
                    $battleEntity->x = $x;
                    $battleEntity->y = $y;
                    $battleEntity->save();
                    return $battleEntity;
                }
            }
        }
    }
}
