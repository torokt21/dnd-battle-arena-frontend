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
import { useState } from "react";

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

type EntityListProps = {
	selectable?: boolean;
	onSelected?: (entity: Entity) => void;
	deletable?: boolean;
	onDeleted?: () => void;
};

export default function EntityList(props: EntityListProps) {
	const { loading, result: entities, error, refetch } = useEntities();
	const [open, setOpen] = useState(false);
	if (loading && !entities) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!entities) return <Container>No data</Container>;

	const handleDeleted = () => {
		refetch();
		props.onDeleted?.();
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
				<Typography variant="h6">Entitások</Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Új entitás
				</Button>
			</Box>
			{entities?.map((entity) => (
				<EntityCard key={entity.id} entity={entity} {...props} onDeleted={handleDeleted} />
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
	selectable?: boolean;
	onSelected?: (entity: Entity) => void;
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
			<Grid item xs={9}>
				<Stack direction="row" spacing={2}>
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
					<Stack direction="column" p={2}>
						<Typography fontWeight="bold">{props.entity.name}</Typography>
						<Typography fontStyle="italic">{props.entity.description}</Typography>
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={3} textAlign="right">
				{props.selectable && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => props.onSelected?.(props.entity)}>
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
