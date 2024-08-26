import "./App.css";

import React, { useEffect } from "react";

import { Entity } from "./types/Entity";
import GridCell from "./GridCell";
import SetupCard from "./SetupCard";
import { useAppStore } from "./AppStore";

function App() {
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);
	const backgroundImageUrl = useAppStore((state) =>
		state.backgroundImage ? URL.createObjectURL(state.backgroundImage) : ""
	);

	return (
		<>
			<SetupCard />
			<div
				className="container"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					width: `${boardWidth * 50}px`,
				}}>
				<table>
					<tbody>
						{[...Array(boardHeight)].map((e, y) => (
							<tr key={y}>
								{[...Array(boardWidth)].map((e, x) => (
									<GridCell key={`${x},${y}`} coordinates={{ x, y }} />
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
