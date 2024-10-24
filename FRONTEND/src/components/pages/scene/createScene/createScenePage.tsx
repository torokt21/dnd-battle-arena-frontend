import Board from "../Board";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MapSettings from "./MapSettings";
import { Navigate } from "react-router-dom";
import { Scene } from "../../../../types/Scene";
import { useState } from "react";

export default function CreateScenePage() {
	const [background, setBackground] = useState<File>();
	const [created, setCreated] = useState(false);
	const [scene, setScene] = useState<Scene>({
		id: 0,
		name: "",
		description: "",
		background: "",
		width: 10,
		height: 10,
	});

	const handleBackgroundChange = (background: File) => {
		setBackground(background);
	};

	const handleCreate = () => {
		if (!background) {
			alert("Please select a background image");
			return;
		}
		const formData = new FormData();
		formData.append("name", scene.name);
		formData.append("background", background);
		formData.append("description", scene.description);
		formData.append("width", scene.width.toString());
		formData.append("height", scene.height.toString());

		fetch(process.env.REACT_APP_API_URL + "/scenes", {
			method: "POST",
			body: formData,
		}).then(() => {
			setCreated(true);
		});
	};

	if (created) {
		return <Navigate to="/scene" />;
	}

	return (
		<Grid container>
			<Grid item xs="auto">
				<MapSettings
					scene={scene}
					onSettingsChange={setScene}
					onBackgroundChange={handleBackgroundChange}
				/>
				<Button variant="contained" color="primary" onClick={handleCreate}>
					Save
				</Button>
			</Grid>
			<Grid item xs={8}>
				<Board scene={scene} localBackground />
			</Grid>
		</Grid>
	);
}
