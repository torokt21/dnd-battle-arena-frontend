import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CreateEntityForm from "./CreateEntityForm";
import { Entity } from "../../../types/Entity";
import Grid from "@mui/material/Grid";
import LoadingIndicator from "../../controls/LoadingIndicator";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import useEntities from "../../../hooks/useEntities";

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

export default function ListEntities() {
	return (
		<>
			<Container>
				<EntityList />
			</Container>
		</>
	);
}

function EntityList() {
	const { loading, result, error, refetch } = useEntities();
	const [open, setOpen] = React.useState(false);
	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!result) return <Container>No data</Container>;

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
				<Typography variant="h6">Entitások</Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Új entitás
				</Button>
			</Box>
			{result?.map((entity) => (
				<EntityCard key={entity.id} entity={entity} onDeleted={() => refetch()} />
			))}
			<Modal open={open}>
				<Box sx={style}>
					<CreateEntityForm onCreated={() => refetch()} onClose={() => setOpen(false)} />
				</Box>
			</Modal>
		</>
	);
}

interface EntityCardProps {
	entity: Entity;
	deletable?: boolean;
	onDeleted?: () => void;
}

function EntityCard(props: EntityCardProps) {
	const deletable = props.deletable ?? true;

	const handleDelete = () => {
		fetch(process.env.REACT_APP_API_URL + "/entities/" + props.entity.id, {
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
						bgcolor: props.entity.color,
						width: 100,
						height: 100,
						borderColor: props.entity.color,
						borderWidth: 4,
						borderStyle: "solid",
					}}
					variant="square"
					src={process.env.REACT_APP_STORAGE_URL + "/" + props.entity.image}
				/>
			</Grid>
			<Grid xs={10}>
				<Stack direction="column" p={2}>
					<Typography fontWeight="bold">{props.entity.name}</Typography>
					<Typography fontStyle="italic">{props.entity.description}</Typography>
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
