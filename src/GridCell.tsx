import { Tooltip, Typography } from "@mui/material";

import { Coordinate } from "./types/Coordinate";
import { useAppStore } from "./AppStore";

type GridCellProps = {
	coordinates: Coordinate;
};

export default function GridCell(props: GridCellProps) {
	const { x, y } = props.coordinates;
	const entity = useAppStore((state) => state.getCellEntity(props.coordinates));
	const gameState = useAppStore((state) => state.gameState);
	const setSelectedEntity = useAppStore((state) => state.setSelectedEntity);
	const selectedEntity = useAppStore((state) => state.selectedEntity);
	const moveEntity = useAppStore((state) => state.moveEntity);
	const showGrid = useAppStore((state) => state.showGrid);
	const alwaysShowNames = useAppStore((state) => state.alwaysShowNames);

	const bgImage = entity ? entity.fileSrc : "";

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {
			backgroundImage: "url(" + bgImage + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		} as React.CSSProperties;

		if (showGrid) {
			style = {
				...style,
				boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15) inset",
			};
		}

		if (gameState === "mapSetup")
			style = {
				...style,
				boxShadow: "0 0 0 1px rgba(255, 0, 0, 0.5) inset",
			};

		if (entity && entity === selectedEntity) {
			style = {
				...style,
				boxShadow: "inset 0 0 10px #0f0, inset 0 0 10px #0f0, inset 0 0 10px #0f0",
			};
		}

		return style;
	};

	const handleClick = () => {
		if (entity && entity === selectedEntity) {
			setSelectedEntity(undefined);
			return;
		}

		if (!entity && selectedEntity) {
			moveEntity(selectedEntity, { x, y });
			return;
		}

		if (entity) {
			setSelectedEntity(entity);
			return;
		}
	};

	return (
		<td className="grid-cell" onClick={handleClick} style={getCellStyle()}>
			{entity && (
				<Tooltip
					open={entity.name !== "" && alwaysShowNames} // Show tooltip only if name is not empty
					arrow
					title={<Typography>{entity.name}</Typography>}
					placement="top"
					slotProps={{
						popper: {
							sx: { pointerEvents: "none", fontSize: "30px" },
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, -12],
									},
								},
							],
						},
					}}
					sx={{ pointerEvents: "none", fontSize: "30px" }}>
					<img className="character-image" alt="" />
				</Tooltip>
			)}
		</td>
	);
}
