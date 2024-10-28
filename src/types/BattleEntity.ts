import { Entity } from "./Entity";

export type BattleEntity = {
	id: number;
	battle_id: number;
	entity_id: number;
	entity: Entity;
	x: number;
	y: number;
	initiative: number;
	dead: boolean;
	created_at: string;
	updated_at: string;
};
