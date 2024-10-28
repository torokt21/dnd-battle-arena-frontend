import { Box, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type NumericUpDownProps = {
	value: number;
	onChangeUp: (value: number) => void;
	onChangeDown: (value: number) => void;
};

export default function NumericUpDown(props: NumericUpDownProps) {
	return (
		<Box>
			<IconButton onClick={() => props.onChangeDown(props.value - 1)}>
				<RemoveIcon />
			</IconButton>
			{props.value}
			<IconButton onClick={() => props.onChangeUp(props.value + 1)}>
				<AddIcon />
			</IconButton>
		</Box>
	);
}
