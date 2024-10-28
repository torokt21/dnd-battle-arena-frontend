import { BattleEntity } from "./types/BattleEntity";
import { Coordinate } from "./types/Coordinate";
import { Entity } from "./types/Entity";
import { GameState } from "./types/GameState";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
	showGrid: boolean;
	setShowGrid: (showGrid: boolean) => void;

	alwaysShowNames: boolean;
	setAlwaysShowNames: (alwaysShowNames: boolean) => void;

	selectedEntity: BattleEntity | undefined;
	setSelectedEntity: (entity: BattleEntity | undefined) => void;

	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
	devtools(
		(set, get) => ({
			showGrid: true,
			setShowGrid: (showGrid) => set({ showGrid: showGrid }),

			alwaysShowNames: true,
			setAlwaysShowNames: (alwaysShowNames) => set({ alwaysShowNames: alwaysShowNames }),

			selectedEntity: undefined,
			setSelectedEntity: (entity) => set({ selectedEntity: entity }),

			sidebarOpen: false,
			setSidebarOpen: (open) => set({ sidebarOpen: open }),
		}),
		{
			name: "bear-storage",
		}
	)
);
