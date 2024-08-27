import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	PaperProps,
} from "@mui/material";
import React, { ChangeEvent } from "react";

import Draggable from "react-draggable";
import { useAppStore } from "./AppStore";

export default function SetupCard() {
	const appStore = useAppStore((state) => state);
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);

	const open = useAppStore((state) => state.gameState === "setup");
	const setGameState = useAppStore((state) => state.setGameState);

	const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
		if (reason && reason === "backdropClick") return;
		setGameState("playing");
	};

	const handleMapFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		appStore.setBackgroundImage(event.target.files[0]);
	};

	const handleCharactersFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		Array.from(event.target.files).forEach((file) => {
			appStore.addEntity({
				fileSrc: URL.createObjectURL(file),
				x: -1,
				y: -1,
			});
		});
	};

	const handleDoneClick = () => {
		if (appStore.backgroundImageSrc === undefined) return;
		appStore.setGameState("playing");
	};

	return (
		<Dialog
			open={open}
			hideBackdrop={true}
			onClose={handleClose}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title">
			<DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
				Beállítások
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Box>
						<label>Térkép</label>
						<br />
						<input type="file" onChange={handleMapFileChange} />
					</Box>
					<Box>
						<label>Karakterek</label>
						<br />
						<input type="file" multiple onChange={handleCharactersFileChange} />
					</Box>
					<Box>
						<label>Oszlopok</label>
						<br />
						<input
							type="number"
							value={boardWidth}
							onChange={(e) => appStore.setBoardWidth(parseInt(e.target.value))}
						/>
					</Box>
					<Box>
						<label>Sorok</label>
						<br />
						<input
							type="number"
							value={boardHeight}
							onChange={(e) => appStore.setBoardHeight(parseInt(e.target.value))}
						/>
					</Box>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{" "}
				<Button onClick={handleDoneClick} variant="contained">
					Kész
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function PaperComponent(props: PaperProps) {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}
