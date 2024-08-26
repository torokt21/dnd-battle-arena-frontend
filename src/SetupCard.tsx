import { ChangeEvent } from "react";
import { useAppStore } from "./AppStore";

export default function SetupCard() {
	const appStore = useAppStore((state) => state);
	const boardWidth = useAppStore((state) => state.boardWidth);
	const boardHeight = useAppStore((state) => state.boardHeight);

	const handleMapFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		appStore.setBackgroundImage(event.target.files[0]);
		//setBackgroundUrl(URL.createObjectURL(event.target.files[0]));
	};

	const handleCharactersFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		Array.from(event.target.files).forEach((file) => {
			appStore.addEntity({
				file: file,
				x: -1,
				y: -1,
			});
		});
	};

	return (
		<div>
			<div>
				<label>Térkép</label>
				<br />
				<input type="file" onChange={handleMapFileChange} />
			</div>
			<div>
				<label>Karakterek</label>
				<br />
				<input type="file" multiple onChange={handleCharactersFileChange} />
			</div>
			<div>
				<label>Oszlopok</label>
				<br />
				<input
					type="number"
					value={boardWidth}
					onChange={(e) => appStore.setBoardWidth(parseInt(e.target.value))}
				/>
			</div>
			<div>
				<label>Sorok</label>
				<br />
				<input
					type="number"
					value={boardHeight}
					onChange={(e) => appStore.setBoardHeight(parseInt(e.target.value))}
				/>
			</div>
		</div>
	);
}
