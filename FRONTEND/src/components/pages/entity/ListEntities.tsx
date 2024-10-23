import { Box, Container, Typography } from "@mui/material";

import CreateEntityForm from "./CreateEntityForm";
import LoadingIndicator from "../../controls/LoadingIndicator";
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

	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!result) return <Container>No data</Container>;

	return (
		<>
			<CreateEntityForm onCreated={() => refetch()} />
			{result?.map((entity) => (
				<Box key={entity.id}>
					<Typography>{entity.name}</Typography>
				</Box>
			))}
		</>
	);
}
