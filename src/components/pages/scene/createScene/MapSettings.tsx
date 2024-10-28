import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import NumericUpDown from "../../../controls/NumericUpDown";
import { Scene } from "../../../../types/Scene";

type MapSettingsProps = {
	scene: Scene;
	onSettingsChange: (scene: Scene) => void;
	onBackgroundChange: (background: File) => void;
};

export default function MapSettings(props: MapSettingsProps) {
	const boardWidth = props.scene.width;
	const boardHeight = props.scene.height;

	const [linked, setLinked] = useState(true);

	const handleMapFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		var file = event.target.files[0];
		var img = new Image();
		var objectUrl = URL.createObjectURL(file);
		img.onload = function () {
			props.onSettingsChange({
				...props.scene,
				background: URL.createObjectURL(file),
				width: Math.floor(img.width / 50),
				height: Math.floor(img.height / 50),
			});
			props.onBackgroundChange(file);
			URL.revokeObjectURL(objectUrl);
		};
		img.src = objectUrl;
		event.target.value = "";
	};

	const handleBoardWidthChangeDown = (value: number) => {
		props.onSettingsChange({
			...props.scene,
			width: value,
			height: linked ? boardHeight - 1 : boardHeight,
		});
	};

	const handleBoardWidthChangeUp = (value: number) => {
		props.onSettingsChange({
			...props.scene,
			width: value,
			height: linked ? boardHeight + 1 : boardHeight,
		});
	};

	const handleBoardHeightChangeDown = (value: number) => {
		props.onSettingsChange({
			...props.scene,
			height: value,
			width: linked ? boardWidth - 1 : boardWidth,
		});
	};

	const handleBoardHeightChangeUp = (value: number) => {
		props.onSettingsChange({
			...props.scene,
			height: value,
			width: linked ? boardWidth + 1 : boardWidth,
		});
	};

	return (
		<>
			<Box my={1}>
				<Typography>Térkép</Typography>
				<input type="file" onChange={handleMapFileChange} />
			</Box>

			<Box my={1}>
				<Typography>Név</Typography>
				<TextField
					fullWidth
					variant="outlined"
					value={props.scene.name}
					onChange={(e) =>
						props.onSettingsChange({ ...props.scene, name: e.target.value })
					}
				/>
			</Box>
			<Box my={1}>
				<Typography>Leírás</Typography>
				<TextField
					fullWidth
					variant="outlined"
					multiline
					rows={4}
					value={props.scene.description}
					onChange={(e) =>
						props.onSettingsChange({ ...props.scene, description: e.target.value })
					}
				/>
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

			<Box></Box>
		</>
	);
}
