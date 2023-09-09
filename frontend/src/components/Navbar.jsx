import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              cursor: "pointer",
              display: "inline",
              textDecoration: "none",
            }}
            component={Link}
            to="/"
            color="inherit"
          >
            Lesson Planner
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
