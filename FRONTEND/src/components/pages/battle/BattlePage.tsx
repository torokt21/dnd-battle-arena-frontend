import Board from "../scene/Board";
import LoadingIndicator from "../../controls/LoadingIndicator";
import useBattle from "../../../hooks/useBattle";
import { useParams } from "react-router-dom";

export default function BattlePage() {
	const battleId = useParams().id;
	const { loading, result: battle, error } = useBattle(Number(battleId));

	if (loading && !battle) {
		return <LoadingIndicator />;
	}

	if (error || !battle) {
		return <div>Error</div>;
	}

	return <Board scene={battle.scene} />;
}
