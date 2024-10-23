import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	Paper,
	PaperProps,
	Stack,
	Switch,
	Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import Draggable from "react-draggable";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import NumericUpDown from "../../controls/NumericUpDown";
import { useAppStore } from "../../../AppStore";

export default function MapSetupWindow() {
	const appStore = useAppStore((state) => state);
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);

	const open = useAppStore((state) => state.gameState === "mapSetup");
	const setGameState = useAppStore((state) => state.setGameState);
	const setBoardWidth = useAppStore((state) => state.setBoardWidth);
	const setBoardHeight = useAppStore((state) => state.setBoardHeight);
	const showGrid = useAppStore((state) => state.showGrid);
	const setShowGrid = useAppStore((state) => state.setShowGrid);
	const alwaysShowNames = useAppStore((state) => state.alwaysShowNames);
	const setAlwaysShowNames = useAppStore((state) => state.setAlwaysShowNames);

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
				<Box my={1}>
					<Typography>Térkép</Typography>
					<input type="file" onChange={handleMapFileChange} />
				</Box>

				<Box my={1}>
					<Typography>Oszlopok</Typography>
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
					<Typography>Sorok</Typography>
					<NumericUpDown
						value={boardHeight}
						onChangeUp={handleBoardHeightChangeUp}
						onChangeDown={handleBoardHeightChangeDown}
					/>
				</Box>

				<Box my={1}>
					<FormControlLabel
						control={
							<Switch
								checked={showGrid}
								onChange={(e, checked) => setShowGrid(checked)}
							/>
						}
						label="Rácsok mutatása mindig"
					/>
				</Box>

				<Box my={1}>
					<FormControlLabel
						control={
							<Switch
								checked={alwaysShowNames}
								onChange={(e, checked) => setAlwaysShowNames(checked)}
							/>
						}
						label="Nevek mutatása mindig"
					/>
				</Box>
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
