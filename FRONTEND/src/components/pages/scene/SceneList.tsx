import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../controls/LoadingIndicator";
import { Scene } from "../../../types/Scene";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import useScenes from "../../../hooks/useScenes";

type SceneListProps = {
	selectable?: boolean;
	onSelected?: (scene: Scene) => void;
	deletable?: boolean;
};

export default function SceneList(props: SceneListProps) {
	const { loading, result: scenes, error, refetch } = useScenes();
	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!scenes) return <Container>No data</Container>;

	const handleDeleted = (scene: Scene) => {
		refetch();
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
				<Typography variant="h6">Térképek</Typography>
				<Button variant="contained" component={Link} to="/scene/create">
					Új térkép
				</Button>
			</Box>
			{scenes?.map((scene) => (
				<SceneCard key={scene.id} scene={scene} {...props} onDeleted={handleDeleted} />
			))}
		</>
	);
}

interface SceneCardProps {
	scene: Scene;
	deletable?: boolean;
	onDeleted?: (scene: Scene) => void;
	selectable?: boolean;
	onSelected?: (scene: Scene) => void;
}

function SceneCard(props: SceneCardProps) {
	const deletable = props.deletable ?? true;

	const handleDelete = () => {
		fetch(process.env.REACT_APP_API_URL + "/scenes/" + props.scene.id, {
			method: "DELETE",
		}).then(() => {
			props.onDeleted?.(props.scene);
		});
	};

	return (
		<Grid container mt={1}>
			<Grid item xs={1}>
				<Avatar
					sx={{
						width: 100,
						height: 100,
					}}
					variant="square"
					src={process.env.REACT_APP_STORAGE_URL + "/" + props.scene.background}
				/>
			</Grid>
			<Grid xs={8}>
				<Stack direction="column" p={2}>
					<Typography fontWeight="bold">{props.scene.name}</Typography>
					<Typography fontStyle="italic">{props.scene.description}</Typography>
				</Stack>
			</Grid>
			<Grid item xs={3} textAlign="right">
				{props.selectable && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => props.onSelected?.(props.scene)}>
						Kiválaszt
					</Button>
				)}
				{deletable && (
					<Button variant="contained" color="warning" onClick={handleDelete}>
						Törlés
					</Button>
				)}
			</Grid>
		</Grid>
	);
}
