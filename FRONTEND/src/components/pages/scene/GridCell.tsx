import { Tooltip, Typography } from "@mui/material";

import { Coordinate } from "../../../types/Coordinate";
import { useAppStore } from "../../../AppStore";

type GridCellProps = {
	coordinates: Coordinate;
};

export default function GridCell(props: GridCellProps) {
	const { x, y } = props.coordinates;
	const setSelectedEntity = useAppStore((state) => state.setSelectedEntity);
	const selectedEntity = useAppStore((state) => state.selectedEntity);
	const showGrid = useAppStore((state) => state.showGrid);
	const alwaysShowNames = useAppStore((state) => state.alwaysShowNames);

	// TODO get entity in cell
	const bgImage = "";

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {
			backgroundImage: "url(" + bgImage + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		} as React.CSSProperties;

		if (showGrid) {
			style = {
				...style,
				boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2) inset",
			};
		}

		return style;
	};

	const handleClick = () => {
		/*
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
			*/
	};

	return (
		<td className="grid-cell" onClick={handleClick} style={getCellStyle()}>
			{false && ( // TODO
				<Tooltip
					open={false && alwaysShowNames ? true : undefined} // Show tooltip only if name is not empty
					arrow
					title={<Typography>Entity name</Typography>}
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
