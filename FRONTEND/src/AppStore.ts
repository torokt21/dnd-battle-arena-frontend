import { devtools, persist } from "zustand/middleware";

import { BattleEntity } from "./types/BattleEntity";
import { create } from "zustand";

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
	persist(
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
				name: "game-storage",
			}
		),
		{
			name: "game-storage", // name of the item in the storage (must be unique)
		}
	)
);
