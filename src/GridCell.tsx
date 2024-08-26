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

	const bgImage = entity ? URL.createObjectURL(entity.file) : "";

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {
			backgroundImage: "url(" + bgImage + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		} as React.CSSProperties;

		if (gameState === "setup")
			style = {
				...style,
				border: "1px solid red",
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
				<div>
					<img className="character-image" alt="" />
				</div>
			)}
		</td>
	);
}
