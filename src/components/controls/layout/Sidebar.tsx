import * as React from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FlagIcon from "@mui/icons-material/Flag";
import GridOffIcon from "@mui/icons-material/GridOff";
import GridOnIcon from "@mui/icons-material/GridOn";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import Slide from "@mui/material/Slide";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppStore } from "../../../AppStore";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
}>(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			},
		},
	],
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function Sidebar() {
	const theme = useTheme();
	const open = useAppStore((state) => state.sidebarOpen);
	const setOpen = useAppStore((state) => state.setSidebarOpen);
	const showGrid = useAppStore((state) => state.showGrid);
	const setShowGrid = useAppStore((state) => state.setShowGrid);
	const alwaysShowNames = useAppStore((state) => state.alwaysShowNames);
	const setAlwaysShowNames = useAppStore((state) => state.setAlwaysShowNames);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const toggleShowGrid = () => {
		setShowGrid(!showGrid);
	};

	const toggleAlwaysShowNames = () => {
		setAlwaysShowNames(!alwaysShowNames);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<HideOnScroll>
				<AppBar open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={[
								{
									mr: 2,
								},
								open && { display: "none" },
							]}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
							DnD Battle Arena
						</Typography>
						<IconButton onClick={toggleShowGrid}>
							{showGrid ? <GridOnIcon /> : <GridOffIcon />}
						</IconButton>

						<IconButton onClick={toggleAlwaysShowNames}>
							{alwaysShowNames ? <SpeakerNotesIcon /> : <SpeakerNotesOffIcon />}
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/battle">
							<ListItemIcon>
								<FlagIcon />
							</ListItemIcon>
							<ListItemText primary="Játékok" />
						</ListItemButton>
					</ListItem>

					<Divider />

					<ListItem disablePadding>
						<ListItemButton component={Link} to="/entity">
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Entitások" />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton component={Link} to="/scene">
							<ListItemIcon>
								<MapIcon />
							</ListItemIcon>
							<ListItemText primary="Térképek" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}

function HideOnScroll(props: { children: React.ReactElement }) {
	const { children } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children ?? <div />}
		</Slide>
	);
}
