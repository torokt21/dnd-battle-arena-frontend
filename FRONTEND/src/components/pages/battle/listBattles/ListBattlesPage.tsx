import { Avatar, Grid, Stack } from "@mui/material";

import { Battle } from "../../../../types/Battle";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../../controls/LoadingIndicator";
import Typography from "@mui/material/Typography";
import useBattles from "../../../../hooks/useBattles";

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
					<BattleCard key={battle.id} battle={battle} />
				))}
			</Container>
		</>
	);
}

interface BattleCardProps {
	battle: Battle;
}

function BattleCard(props: BattleCardProps) {
	return (
		<Grid container mt={1}>
			<Grid item xs={1}>
				<Avatar
					sx={{
						width: 100,
						height: 100,
					}}
					variant="square"
					src={process.env.REACT_APP_STORAGE_URL + "/" + props.battle.scene.background}
				/>
			</Grid>
			<Grid xs={8}>
				<Stack direction="column" p={2}>
					<Typography fontWeight="bold">{props.battle.name}</Typography>
					<Typography fontStyle="italic">{props.battle.description}</Typography>
				</Stack>
			</Grid>
			<Grid item xs={3} textAlign="right">
				<Button
					variant="contained"
					color="warning"
					component={Link}
					to={"/battle/" + props.battle.id}>
					Folytatás
				</Button>
			</Grid>
		</Grid>
	);
}
