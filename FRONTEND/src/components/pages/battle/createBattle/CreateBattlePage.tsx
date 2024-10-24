import { Button, TextField } from "@mui/material";
import { Container, Grid, Typography } from "@mui/material";

import { Battle } from "../../../../types/Battle";
import { Scene } from "../../../../types/Scene";
import SceneList from "../../scene/SceneList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateBattlePage() {
	const [selectedScene, setSelectedScene] = useState<Scene>();
	const [battleName, setBattleName] = useState("");
	const [battleDescription, setBattleDescription] = useState("");
	const [creating, setCreating] = useState(false);
	const navigate = useNavigate();

	const handleBattleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBattleName(event.target.value);
	};

	const handleBattleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBattleDescription(event.target.value);
	};

	const handleSubmit = () => {
		setCreating(true);
		fetch(process.env.REACT_APP_API_URL + "/battles", {
			method: "POST",
			headers: new Headers({ "Content-type": "application/json" }), // Add this line
			body: JSON.stringify({
				scene_id: selectedScene?.id,
				name: battleName,
				description: battleDescription,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to create battle");
				}
				return response.json();
			})
			.then((battle: Battle) => {
				navigate("/battle/" + battle.id);
			})
			.finally(() => {
				setCreating(false);
			});
	};

	if (creating) {
		return <Typography>Létrehozás...</Typography>;
	}

	return (
		<Container>
			<Typography variant="h4" mb={3}>
				Új játék
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					{!selectedScene && (
						<SceneList selectable deletable={false} onSelected={setSelectedScene} />
					)}

					{selectedScene && (
						<>
							<Typography variant="h6">Térkép: {selectedScene.name}</Typography>
							<form noValidate autoComplete="off">
								<TextField
									label="Játék neve"
									variant="outlined"
									fullWidth
									margin="normal"
									value={battleName}
									onChange={handleBattleNameChange}
								/>
								<TextField
									label="Játék leírása"
									variant="outlined"
									fullWidth
									margin="normal"
									value={battleDescription}
									onChange={handleBattleDescriptionChange}
								/>
								<Button variant="contained" color="primary" onClick={handleSubmit}>
									Create Battle
								</Button>
							</form>
						</>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}
