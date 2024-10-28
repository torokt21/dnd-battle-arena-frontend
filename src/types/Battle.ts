import { BattleEntity } from "./BattleEntity";
import { Scene } from "./Scene";

export type Battle = {
	id: number;
	name: string;
	description: string;
	scene_id: number;
	scene: Scene;
	created_at: string;
	updated_at: string;
	battle_entities: BattleEntity[];
};
