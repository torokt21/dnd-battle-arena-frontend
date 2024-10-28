import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BattlePage from "./components/pages/battle/BattlePage";
import CreateBattlePage from "./components/pages/battle/createBattle/CreateBattlePage";
import CreateScenePage from "./components/pages/scene/createScene/CreateScenePage";
import { CssBaseline } from "@mui/material";
import Layout from "./components/controls/layout/Layout";
import ListBattlesPage from "./components/pages/battle/listBattles/ListBattlesPage";
import ListEntitiesPage from "./components/pages/entity/ListEntitiesPage";
import ListScenesPage from "./components/pages/scene/ListScenesPage";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: "#757ce8",
			main: "#3f50b5",
			dark: "#002884",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <ListBattlesPage />,
				},
				{
					path: "entity",
					element: <ListEntitiesPage />,
				},
				{
					path: "scene",
					element: <ListScenesPage />,
				},
				{
					path: "scene/create",
					element: <CreateScenePage />,
				},
				{
					path: "battle",
					element: <ListBattlesPage />,
				},
				{
					path: "battle/create",
					element: <CreateBattlePage />,
				},
				{
					path: "battle/:id",
					element: <BattlePage />,
				},
			],
		},
	],
	{ basename: "/dnd" }
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
