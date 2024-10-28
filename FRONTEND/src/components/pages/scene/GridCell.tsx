import { Tooltip, Typography } from "@mui/material";

import { BattleEntity } from "../../../types/BattleEntity";
import { Coordinate } from "../../../types/Coordinate";
import { Entity } from "../../../types/Entity";
import { useAppStore } from "../../../AppStore";

type GridCellProps = {
	coordinates: Coordinate;
	battleEntities?: BattleEntity[];
};

export default function GridCell(props: GridCellProps) {
	const { x, y } = props.coordinates;
	const setSelectedEntity = useAppStore((state) => state.setSelectedEntity);
	const selectedEntity = useAppStore((state) => state.selectedEntity);
	const showGrid = useAppStore((state) => state.showGrid);

	const battleEntity = props.battleEntities?.find((e) => e.x === x && e.y === y);

	// TODO get entity in cell
	const bgImage = battleEntity?.entity.image
		? process.env.REACT_APP_STORAGE_URL + "/" + battleEntity?.entity.image
		: "";

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {
			backgroundImage: "url(" + bgImage + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundColor: battleEntity?.entity.color,
		} as React.CSSProperties;

		if (showGrid) {
			style = {
				...style,
				boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2) inset",
			};
		}

		if (selectedEntity && battleEntity && battleEntity.id === selectedEntity.id) {
			style = {
				...style,
				boxShadow: "inset 0px 0px 1px 3px rgba(255,0,0,1)",
			};
		}

		return style;
	};

	const handleClick = () => {
		if (battleEntity && battleEntity.id === selectedEntity?.id) {
			setSelectedEntity(undefined);
			return;
		}

		if (!battleEntity && selectedEntity) {
			//moveEntity(selectedEntity, { x, y });
			return;
		}

		if (battleEntity) {
			setSelectedEntity(battleEntity);
			return;
		}
	};

	return (
		<td className="grid-cell" onClick={handleClick} style={getCellStyle()}>
			{battleEntity && ( // TODO
				<TooltipWrapper title={battleEntity?.entity.name}>
					<img className="character-image" alt="" />
				</TooltipWrapper>
			)}
		</td>
	);
}

function TooltipWrapper(props: { children: React.ReactElement; title?: string }) {
	const alwaysShowNames = useAppStore((state) => state.alwaysShowNames);

	if (!props.title) {
		return props.children;
	}
	return (
		<Tooltip
			open={alwaysShowNames ? true : undefined}
			arrow
			title={<Typography>{props.title}</Typography>}
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
			{props.children}
		</Tooltip>
	);
}
