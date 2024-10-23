import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CreateEntityForm from "./CreateEntityForm";
import LoadingIndicator from "../../controls/LoadingIndicator";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useEntities from "../../../hooks/useEntities";

export default function ListEntities() {
	return (
		<>
			<Container>
				<Typography component="h1" variant="h4">
					Entitások
				</Typography>

				<EntityList />
			</Container>
		</>
	);
}

function EntityList() {
	const { loading, result, error, refetch } = useEntities();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!result) return <Container>No data</Container>;

	return (
		<>
			<Button onClick={handleOpen}>Új entitás</Button>
			{result?.map((entity) => (
				<Box key={entity.id}>
					<Typography>{entity.name}</Typography>
				</Box>
			))}
			<Modal open={open}>
				<CreateEntityForm onCreated={() => refetch()} onClose={handleClose} />
			</Modal>
		</>
	);
}
