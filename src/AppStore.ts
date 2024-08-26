import { Coordinate } from "./types/Coordinate";
import { Entity } from "./types/Entity";
import { GameState } from "./types/GameState";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
	gameState: GameState;

	boardWidth: number;
	boardHeight: number;
	setBoardWidth: (width: number) => void;
	setBoardHeight: (height: number) => void;

	getCellEntity: (coordinates: Coordinate) => Entity | undefined;

	entities: Entity[];
	addEntity: (entity: Entity) => void;
	removeEntity: (entity: Entity) => void;
	setEntities: (entities: Entity[]) => void;
	moveEntity: (entity: Entity, coordinates: Coordinate) => void;

	backgroundImage: File | undefined;
	setBackgroundImage: (backgroundImage: File) => void;
}

export const useAppStore = create<AppState>()(
	devtools(
		(set, get) => ({
			gameState: "setup",

			boardWidth: 10,
			boardHeight: 20,
			setBoardWidth: (width) => set({ boardWidth: width }),
			setBoardHeight: (height) => set({ boardHeight: height }),

			entities: [],
			addEntity: (entity) => {
				let firstEmptyX = -1;
				let firstEmptyY = -1;

				for (let y = 0; y < get().boardHeight; y++) {
					for (let x = 0; x < get().boardWidth; x++) {
						if (get().getCellEntity({ x, y }) === undefined) {
							firstEmptyX = x;
							firstEmptyY = y;
							break;
						}
					}
					if (firstEmptyX !== -1) break;
				}

				set((state) => {
					return {
						entities: [
							...state.entities,
							{ ...entity, x: firstEmptyX, y: firstEmptyY },
						],
					};
				});
			},
			removeEntity: (entity) =>
				set((state) => ({ entities: state.entities.filter((e) => e !== entity) })),
			setEntities: (entities) => set({ entities }),
			moveEntity: (entity, coordinates) => {
				console.log("Move entity", entity, coordinates);
				const clone = get().entities.map((char) => {
					if (char === entity) return { ...char, x: coordinates.x, y: coordinates.y };
					return char;
				});

				set({ entities: clone });
				console.log("Entities", get().entities);
			},

			getCellEntity: (coordinates: Coordinate) => {
				return get().entities.find(
					(char) => char.x === coordinates.x && char.y === coordinates.y
				);
			},

			backgroundImage: undefined,
			setBackgroundImage: (backgroundImage: File) => set({ backgroundImage }),
		}),
		{
			name: "bear-storage",
		}
	)
);
