import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import LoadingIndicator from "../../controls/LoadingIndicator";

type CreateEntityFormProps = {
	onCreated: () => void;
	onClose: () => void;
};

export default function CreateEntityForm(props: CreateEntityFormProps) {
	const [name, setName] = useState("");
	const [picture, setPicture] = useState<File>();
	const [color, setColor] = useState("");
	const [description, setDescription] = useState("");
	const [preview, setPreview] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!picture) return;

		setLoading(true);

		// Submit to API
		const formData = new FormData();

		formData.append("image", picture);
		formData.append("name", name);
		formData.append("color", color);
		formData.append("description", description);

		fetch(process.env.REACT_APP_API_URL + "/entities", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (!response.ok) throw new Error("Failed to create entity.");

				return response.json();
			})
			.then((data) => {
				props.onCreated();
				setName("");
				setPicture(undefined);
				setColor("");
				setDescription("");
				props.onClose();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (!picture) return;

		// create the preview
		const objectUrl = URL.createObjectURL(picture);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [picture]);

	if (loading) return <LoadingIndicator />;

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							type="file"
							fullWidth
							onChange={(e) => setPicture((e.target as HTMLInputElement).files?.[0])}
						/>
					</Grid>
					<Grid item xs={12} textAlign="center">
						{picture && (
							<Box
								component="img"
								sx={{
									maxHeight: { xs: 233, md: 167 },
									maxWidth: { xs: 350, md: 250 },
								}}
								alt=""
								src={preview}
							/>
						)}
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Name"
							variant="outlined"
							fullWidth
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="color"
							label="Color"
							variant="outlined"
							fullWidth
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Description"
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={6}>
								<Button variant="outlined" onClick={props.onClose}>
									Mégsem
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button type="submit" variant="contained" color="success" fullWidth>
									Hozzáadás
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
