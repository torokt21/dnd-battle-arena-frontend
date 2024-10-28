import { Box, Button, Modal } from "@mui/material";

import Board from "../scene/Board";
import { Entity } from "../../../types/Entity";
import EntityList from "../entity/EntityList";
import LoadingIndicator from "../../controls/LoadingIndicator";
import useBattle from "../../../hooks/useBattle";
import { useParams } from "react-router-dom";
import { useState } from "react";

const modalBoxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function BattlePage() {
	const battleId = Number(useParams().id);
	const { loading, result: battle, error, refetch } = useBattle(battleId);
	const [entityModalOpen, setEntityModalOpen] = useState(false);

	if (loading && !battle) {
		return <LoadingIndicator />;
	}

	if (error || !battle) {
		return <div>Error</div>;
	}

	const placeEntity = (entity: Entity) => {
		fetch(process.env.REACT_APP_API_URL + "/battleEntity", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ entity_id: entity.id, battle_id: battleId }),
		}).then(() => {
			refetch();
		});
	};

	return (
		<>
			<Box>
				<Button onClick={() => setEntityModalOpen(true)}>Entitás</Button>
			</Box>

			<Board scene={battle.scene} battleEntities={battle.battle_entities} />

			<Modal open={entityModalOpen} onClose={() => setEntityModalOpen(false)}>
				<Box sx={modalBoxStyle}>
					<EntityList deletable={false} selectable={true} onSelected={placeEntity} />
				</Box>
			</Modal>
		</>
	);
}
