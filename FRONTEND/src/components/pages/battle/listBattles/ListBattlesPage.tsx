import { Battle } from "../../../../types/Battle";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../../controls/LoadingIndicator";
import Typography from "@mui/material/Typography";
import useBattles from "../../../../hooks/useBattles";
import { useState } from "react";

export default function ListBattlesPage() {
	const { loading, result: battles, error, refetch } = useBattles();
	if (loading) return <LoadingIndicator />;

	if (error) return <Container>Error</Container>;

	if (!battles) return <Container>No data</Container>;

	return (
		<>
			<Container>
				<Typography variant="h4">Játékok</Typography>

				<Button component={Link} to="create" variant="contained">
					Új játék
				</Button>

				{battles?.map((battle) => (
					<BattleCard key={battle.id} battle={battle} onDeleted={() => refetch()} />
				))}
			</Container>
		</>
	);
}

interface BattleCardProps {
	battle: Battle;
	onDeleted?: () => void;
}

function BattleCard({ battle, onDeleted }: BattleCardProps) {
	return (
		<div>
			<Typography variant="h6">{battle.name}</Typography>
			<Typography variant="body1">{battle.description}</Typography>
		</div>
	);
}
