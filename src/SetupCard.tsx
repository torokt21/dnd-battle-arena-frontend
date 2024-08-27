import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Paper,
	PaperProps,
	Stack,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import Draggable from "react-draggable";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import NumericUpDown from "./controls/NumericUpDown";
import { useAppStore } from "./AppStore";

export default function SetupCard() {
	const appStore = useAppStore((state) => state);
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);

	const open = useAppStore((state) => state.gameState === "mapSetup");
	const setGameState = useAppStore((state) => state.setGameState);
	const setBoardWidth = useAppStore((state) => state.setBoardWidth);
	const setBoardHeight = useAppStore((state) => state.setBoardHeight);

	const [linked, setLinked] = useState(true);

	const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
		if (reason && reason === "backdropClick") return;
		setGameState("playing");
	};

	const handleMapFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		var file = event.target.files[0];
		var img = new Image();
		var objectUrl = URL.createObjectURL(file);
		img.onload = function () {
			setBoardHeight(Math.floor(img.height / 50));
			setBoardWidth(Math.floor(img.width / 50));
			appStore.setBackgroundImage(file);
			URL.revokeObjectURL(objectUrl);
		};
		img.src = objectUrl;
		event.target.value = "";
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
		event.target.value = "";
	};

	const handleDoneClick = () => {
		if (appStore.backgroundImageSrc === undefined) return;
		appStore.setGameState("playing");
	};
	const handleBoardWidthChangeDown = (value: number) => {
		setBoardWidth(value);

		if (linked) {
			setBoardHeight(boardHeight - 1);
		}
	};

	const handleBoardWidthChangeUp = (value: number) => {
		setBoardWidth(value);

		if (linked) {
			setBoardHeight(boardHeight + 1);
		}
	};

	const handleBoardHeightChangeDown = (value: number) => {
		setBoardHeight(value);

		if (linked) {
			setBoardWidth(boardWidth - 1);
		}
	};

	const handleBoardHeightChangeUp = (value: number) => {
		setBoardHeight(value);

		if (linked) {
			setBoardWidth(boardWidth + 1);
		}
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
						<Box>
							<label>Karakterek</label>
							<br />
							<input type="file" multiple onChange={handleCharactersFileChange} />
						</Box>
					</Box>
					<Box>
						<label>Oszlopok</label>
						<Stack direction="row" spacing={2}>
							<NumericUpDown
								value={boardWidth}
								onChangeUp={handleBoardWidthChangeUp}
								onChangeDown={handleBoardWidthChangeDown}
							/>
							<IconButton onClick={() => setLinked(!linked)}>
								{linked ? <LinkIcon /> : <LinkOffIcon />}
							</IconButton>
						</Stack>
					</Box>
					<Box>
						<label>Sorok</label>
						<br />
						<NumericUpDown
							value={boardHeight}
							onChangeUp={handleBoardHeightChangeUp}
							onChangeDown={handleBoardHeightChangeDown}
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
