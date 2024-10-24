import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoadingIndicator from "../../controls/LoadingIndicator";
import Modal from "@mui/material/Modal";
import { Scene } from "../../../types/Scene";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import useScenes from "../../../hooks/useScenes";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ListScenesPage() {
	return (
		<>
			<Container>
				<SceneList />
			</Container>
		</>
	);
}

function SceneList() {
	const { loading, result: scenes, error, refetch } = useScenes();
	const [open, setOpen] = React.useState(false);
	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!scenes) return <Container>No data</Container>;

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
				<Typography variant="h6">Térképek</Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Új térkép
				</Button>
			</Box>
			{scenes?.map((scene) => (
				<SceneCard key={scene.id} scene={scene} onDeleted={() => refetch()} />
			))}
		</>
	);
}

interface SceneCardProps {
	scene: Scene;
	deletable?: boolean;
	onDeleted?: () => void;
}

function SceneCard(props: SceneCardProps) {
	const deletable = props.deletable ?? true;

	const handleDelete = () => {
		fetch(process.env.REACT_APP_API_URL + "/scenes/" + props.scene.id, {
			method: "DELETE",
		}).then(() => {
			props.onDeleted?.();
		});
	};

	return (
		<Grid container mt={1}>
			<Grid item xs="auto">
				<Avatar
					sx={{
						width: 100,
						height: 100,
					}}
					variant="square"
					src={process.env.REACT_APP_STORAGE_URL + "/" + props.scene.background}
				/>
			</Grid>
			<Grid xs={10}>
				<Stack direction="column" p={2}>
					<Typography fontWeight="bold">{props.scene.name}</Typography>
					<Typography fontStyle="italic">{props.scene.description}</Typography>
				</Stack>
			</Grid>
			<Grid item xs="auto" textAlign="right">
				{deletable && (
					<Button variant="contained" color="warning" onClick={handleDelete}>
						Törlés
					</Button>
				)}
			</Grid>
		</Grid>
	);
}
