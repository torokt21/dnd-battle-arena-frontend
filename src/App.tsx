import "./App.css";

import { Box, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import GridCell from "./GridCell";
import React from "react";
import SetupCard from "./SetupCard";
import TuneIcon from "@mui/icons-material/Tune";
import { useAppStore } from "./AppStore";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: "#757ce8",
			main: "#3f50b5",
			dark: "#002884",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});

function App() {
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);
	const backgroundImageUrl = useAppStore((state) =>
		state.backgroundImageSrc ? state.backgroundImageSrc : ""
	);
	const gameState = useAppStore((state) => state.gameState);
	const setGameState = useAppStore((state) => state.setGameState);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box p={2}>
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

				{gameState === "playing" && (
					<Box textAlign="center" py={2}>
						<Button
							variant="contained"
							startIcon={<TuneIcon />}
							onClick={() => setGameState("setup")}>
							Beállítások
						</Button>
					</Box>
				)}
			</Box>
		</ThemeProvider>
	);
}

export default App;
