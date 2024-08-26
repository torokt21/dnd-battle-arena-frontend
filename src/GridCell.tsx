import { Coordinate } from "./types/Coordinate";
import { Entity } from "./types/Entity";
import { useAppStore } from "./AppStore";

type GridCellProps = {
	coordinates: Coordinate;
};

export default function GridCell(props: GridCellProps) {
	const { x, y } = props.coordinates;
	const entity = useAppStore((state) => state.getCellEntity(props.coordinates));
	const gameState = useAppStore((state) => state.gameState);

	function allowDrop(event: React.DragEvent<HTMLTableCellElement>) {
		console.log("Entity");

		if (!entity) return false;
		event.preventDefault();
	}

	const handleDragEnter = (event: React.DragEvent<HTMLTableCellElement>) => {
		event.preventDefault();
		var data = event.dataTransfer.getData("text");
		console.log("Get data", data);
	};

	const handleDrop = (event: React.DragEvent<HTMLTableCellElement>) => {
		const id = event.dataTransfer.getData("text");
		console.log(`Somebody dropped an element with id: ${id}`);
	};

	const handleDragStart = (event: React.DragEvent<HTMLTableCellElement>) => {
		event.dataTransfer.setData("text", x + "," + y);
	};

	const getCellContent = () => {
		const foundChar = entity;
		if (foundChar)
			return (
				<div>
					<img
						className="character-image"
						src={URL.createObjectURL(foundChar.file)}
						alt=""
					/>
				</div>
			);
		return undefined;
	};

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {};

		if (gameState === "setup")
			style = {
				...style,
				border: "1px solid red",
			};

		return style;
	};

	return (
		<td
			draggable
			className="grid-cell"
			onDragOver={allowDrop}
			onDragStart={handleDragStart}
			onDrop={handleDrop}
			onDragEnter={handleDragEnter}
			style={getCellStyle()}>
			{getCellContent()}
		</td>
	);
}
