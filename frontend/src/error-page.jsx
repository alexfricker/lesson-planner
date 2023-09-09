import { useRouteError } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";

import darkTheme from "./darkTheme";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box
          id="error-page"
          sx={{
            border: 1,
            borderColor: "error.main",
            borderRadius: 3,
            display: "flex",
            m: "auto",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h3" sx={{ m: 3 }}>
            Oops!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography variant="overline" sx={{ mb: 2 }}>
            <i>{error.statusText || error.message}</i>
          </Typography>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
