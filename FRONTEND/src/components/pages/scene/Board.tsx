import { BattleEntity } from "../../../types/BattleEntity";
import { Box } from "@mui/material";
import GridCell from "./GridCell";
import { Scene } from "../../../types/Scene";

type BoardProps = {
	scene: Scene;
	battleEntities?: BattleEntity[];
	localBackground?: boolean;
};

function Board(props: BoardProps) {
	const boardWidth = props.scene.width;
	const boardHeight = props.scene.height;
	const backgroundImageUrl = props.localBackground
		? props.scene.background
		: process.env.REACT_APP_STORAGE_URL + "/" + props.scene.background;

	return (
		<Box p={2}>
			<Box
				className="container"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					width: `${boardWidth * 50}px`,
				}}>
				<table>
					<tbody>
						{[...Array(boardHeight)].map((e, y) => (
							<tr key={y}>
								{[...Array(boardWidth)].map((e, x) => (
									<GridCell
										key={`${x},${y}`}
										coordinates={{ x, y }}
										battleEntities={props.battleEntities}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</Box>
		</Box>
	);
}

export default Board;
