import "./App.css";

import { Box, Button, Stack } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import EntitySetupWindow from "./EntitySetupWindow";
import GridCell from "./GridCell";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";
import { useAppStore } from "../../../AppStore";

function App() {
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);
	const backgroundImageUrl = useAppStore((state) =>
		state.backgroundImageSrc ? state.backgroundImageSrc : ""
	);
	const gameState = useAppStore((state) => state.gameState);
	const setGameState = useAppStore((state) => state.setGameState);

	return (
		<Box p={2}>
			<EntitySetupWindow />
			<Box
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
			</Box>

			{gameState === "playing" && (
				<Stack direction="row" spacing={2} py={2} sx={{ justifyContent: "center" }}>
					<Button
						variant="contained"
						startIcon={<TuneIcon />}
						onClick={() => setGameState("mapSetup")}>
						Térkép beállítások
					</Button>

					<Button
						variant="contained"
						startIcon={<PeopleIcon />}
						onClick={() => setGameState("playerSetup")}>
						Entitások
					</Button>
				</Stack>
			)}
		</Box>
	);
}

export default App;
