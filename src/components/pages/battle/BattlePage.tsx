import { Box, Button, Modal } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { BattleEntity } from "../../../types/BattleEntity";
import Board from "../scene/Board";
import { Entity } from "../../../types/Entity";
import EntityList from "../entity/EntityList";
import LoadingIndicator from "../../controls/LoadingIndicator";
import { useAppStore } from "../../../AppStore";
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
	const selectedEntity = useAppStore((state) => state.selectedEntity);
	const setSelectedEntity = useAppStore((state) => state.setSelectedEntity);

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

	const moveBattleEntity = (entity: BattleEntity, coordinates: { x: number; y: number }) => {
		fetch(process.env.REACT_APP_API_URL + "/battleEntity/" + entity.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(coordinates),
		}).then(() => {
			refetch();
		});
	};

	const onMoveSelectedEntity = (coordinates: { x: number; y: number }) => {
		if (!selectedEntity) {
			return;
		}

		moveBattleEntity(selectedEntity, coordinates);
		setSelectedEntity(undefined);
	};

	const handleDeleteEntity = (entity: BattleEntity) => {
		fetch(process.env.REACT_APP_API_URL + "/battleEntity/" + entity.id, {
			method: "DELETE",
		}).then(() => {
			refetch();
		});
	};

	const handleMarkEntityDead = (entity: BattleEntity) => {
		fetch(process.env.REACT_APP_API_URL + "/battleEntity/" + entity.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ dead: !entity.dead }),
		}).then(() => {
			refetch();
		});
	};

	return (
		<>
			<Box textAlign="center">
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() => setEntityModalOpen(true)}>
					Entitás
				</Button>
			</Box>

			<Board
				scene={battle.scene}
				battleEntities={battle.battle_entities}
				onMoveSelectedEntity={(coords) => onMoveSelectedEntity(coords)}
				onDeleteEntity={(entity) => handleDeleteEntity(entity)}
				onMarkEntityDead={(entity) => handleMarkEntityDead(entity)}
			/>

			<Modal open={entityModalOpen} onClose={() => setEntityModalOpen(false)}>
				<Box sx={modalBoxStyle}>
					<EntityList deletable={false} selectable={true} onSelected={placeEntity} />
				</Box>
			</Modal>
		</>
	);
}
