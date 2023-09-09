import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";
import SidePanel from "../components/SidePanel";
import darkTheme from "../darkTheme";

import { getStudents } from "../api";

const NavbarSpacer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export async function loader() {
  const students = await getStudents();
  return { students };
}

export default function Root() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <SidePanel />
        <Box component="main" sx={{ flexGrow: 1, pt: 3, pr: 3, pl: 3, pb: 10 }}>
          <NavbarSpacer />
          <Outlet />
          <NavbarSpacer />
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
