import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 300,
        right: 0,
        padding: 1,
        borderRadius: 0,
      }}
      elevation={3}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://www.alexfricker.com/">
          Alex Fricker
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Paper>
  );
}
