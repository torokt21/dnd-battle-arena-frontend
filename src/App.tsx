import "./App.css";

import React, { ChangeEvent, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

type Coordinate = { x: number; y: number };

type Entity = {
	image: string;
	x: number;
	y: number;
};

type Grid = {
	cells: GridCell[][];
};

type GridCell = {};

function App() {
	const [gridSetup, setGridSetup] = useState(true);
	const [size, setSize] = useState<Coordinate>({ x: 10, y: 20 });
	const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate[]>();
	const [grid, setGrid] = useState<Grid>();
	const [backgroundUrl, setBackgroundUrl] = useState<string>("");
	const [characters, setCharacters] = useState<Entity[]>([]);

	const handleMapFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		setBackgroundUrl(URL.createObjectURL(event.target.files[0]));
	};

	const handleCharactersFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;
		setCharacters([
			...characters,
			...Array.from(event.target.files).map((file) => {
				return {
					image: URL.createObjectURL(file),
					id: uuidv4(),
					x: -1,
					y: -1,
				} as Entity;
			}),
		]);
	};

	useEffect(() => {
		placeUnplacedCharacters();
	}, [characters]);

	const placeUnplacedCharacters = () => {
		characters.forEach((char) => {
			if (char.x !== -1 && char.y !== -1) return;

			for (let y = 0; y < size.y; y++) {
				for (let x = 0; x < size.x; x++) {
					if (getCellEntity({ x, y }) === undefined) {
						const clone: Entity[] = [
							...characters.filter((c) => c !== char),
							...[{ ...char, x: x, y: y }],
						];

						setCharacters(clone);
						return;
					}
				}
			}
		});
	};

	useEffect(() => {
		const newGrid: Grid = {
			cells: [],
		};
		for (let y = 0; y < size.y; y++) {
			const row: GridCell[] = [];
			for (let x = 0; x < size.x; x++) {
				row.push({
					entity: undefined,
				});
			}
			newGrid.cells.push(row);
		}

		setGrid(newGrid);
	}, [size]);

	const getCellEntity = (coordinates: Coordinate) => {
		return characters.find((char) => char.x === coordinates.x && char.y === coordinates.y);
	};

	if (!grid) return <>Loading</>;

	return (
		<>
			<div>
				<div>
					<label>Térkép</label>
					<br />
					<input type="file" onChange={handleMapFileChange} />
				</div>
				<div>
					<label>Karakterek</label>
					<br />
					<input type="file" multiple onChange={handleCharactersFileChange} />
				</div>
				<div>
					<label>Oszlopok</label>
					<br />
					<input
						type="number"
						value={size.x}
						onChange={(e) => setSize({ x: parseInt(e.target.value), y: size.y })}
					/>
				</div>
				<div>
					<label>Sorok</label>
					<br />
					<input
						type="number"
						value={size.y}
						onChange={(e) => setSize({ x: size.x, y: parseInt(e.target.value) })}
					/>
				</div>
			</div>
			<div
				className="container"
				style={{ backgroundImage: `url(${backgroundUrl})`, width: `${size.x * 50}px` }}>
				<table>
					<tbody>
						{grid.cells.map((row, y) => (
							<tr key={y}>
								{grid.cells[y].map((cell, x) => (
									<GridCell
										key={`${x},${y}`}
										coordinates={{ x, y }}
										getCellEntity={getCellEntity}
										gridSetup={gridSetup}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

type GridCellProps = {
	coordinates: Coordinate;
	getCellEntity: (coordinates: Coordinate) => Entity | undefined;
	gridSetup: boolean;
};

function GridCell(props: GridCellProps) {
	const { x, y } = props.coordinates;
	const entity = props.getCellEntity(props.coordinates);
	function allowDrop(event: React.DragEvent<HTMLTableCellElement>) {
		return true;
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
		const foundChar = props.getCellEntity(props.coordinates);
		if (foundChar)
			return (
				<div>
					<img className="character-image" src={foundChar.image} alt="" />
				</div>
			);
		return undefined;
	};

	const getCellStyle = (): React.CSSProperties | undefined => {
		let style = {};

		if (props.gridSetup)
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

export default App;
