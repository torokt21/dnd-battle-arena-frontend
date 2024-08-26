import "./App.css";

import GridCell from "./GridCell";
import React from "react";
import SetupCard from "./SetupCard";
import background from "./background.jpg";
import { useAppStore } from "./AppStore";

function App() {
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);
	const backgroundImageUrl = useAppStore((state) =>
		state.backgroundImage ? URL.createObjectURL(state.backgroundImage) : ""
	);
	const gameState = useAppStore((state) => state.gameState);
	const setGameState = useAppStore((state) => state.setGameState);

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}>
			{gameState === "setup" && <SetupCard />}
			{gameState === "playing" && (
				<button onClick={() => setGameState("setup")}>Beállítások</button>
			)}
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
		</div>
	);
}

export default App;
