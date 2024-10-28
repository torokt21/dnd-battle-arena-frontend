import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Input,
	Paper,
	PaperProps,
	Stack,
	Typography,
} from "@mui/material";

import { ChangeEvent } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Draggable from "react-draggable";
import { Entity } from "../../../types/Entity";
import { useAppStore } from "../../../AppStore";

export default function EntitySetupWindow() {
	/*
	const appStore = useAppStore((state) => state);
	const setGameState = useAppStore((state) => state.setGameState);
	const entities = useAppStore((state) => state.entities);
	const setEntityName = useAppStore((state) => state.setEntityName);

	const handleCharactersFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		Array.from(event.target.files).forEach((file) => {
			appStore.addEntity({
				fileSrc: URL.createObjectURL(file),
				x: -1,
				y: -1,
				name: "",
			});
		});
		event.target.value = "";
	};

	const open = useAppStore((state) => state.gameState === "playerSetup");

	const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
		if (reason && reason === "backdropClick") return;
		setGameState("playing");
	};

	const handleNameChange = (value: string, entity: Entity) => {
		setEntityName(entity, value);
	};

	return (
		<Dialog
			open={open}
			hideBackdrop={true}
			onClose={handleClose}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title">
			<DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
				Entitások
			</DialogTitle>
			<DialogContent>
				<Box>
					<Box>
						<Typography>Entitások</Typography>
						{entities.map((entity) => (
							<Stack direction="row" key={entity.fileSrc} spacing={2} my={1}>
								<Box
									sx={{
										backgroundImage: `url(${entity.fileSrc})`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										width: "50px",
										height: "50px",
									}}
								/>

								<Input
									placeholder="Név"
									value={entity?.name}
									onChange={(e) => handleNameChange(e.target.value, entity)}
								/>

								<IconButton onClick={() => appStore.removeEntity(entity)}>
									<ClearIcon />
								</IconButton>
							</Stack>
						))}
					</Box>

					<Box my={2}>
						<Typography>Új karakterek hozzáadása</Typography>
						<input type="file" multiple onChange={handleCharactersFileChange} />
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => appStore.setGameState("playing")} variant="contained">
					Kész
				</Button>
			</DialogActions>
		</Dialog>
	);
	*/
	return <>TODO</>;
}

function PaperComponent(props: PaperProps) {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}
