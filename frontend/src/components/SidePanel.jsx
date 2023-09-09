import { Link, useLoaderData } from "react-router-dom";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import StorageIcon from "@mui/icons-material/Storage";

const drawerWidth = 300;

function getIcon(name) {
  return <StorageIcon />;
}

function setWindow(st) {
  window.location = st;
}

function SidePanelLink(props) {
  return (
    <ListItem key={props.name} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
        }}
        selected={props.selectedId === props.studentId}
        component={Link}
        to={props.to}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
          }}
        >
          {getIcon(props.name)}
        </ListItemIcon>
        <ListItemText primary={props.name} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  );
}

function BottomLink(props) {
  return (
    <ListItem key={props.name} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
        }}
        onClick={() => setWindow(props.url)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
          }}
        ></ListItemIcon>
        <ListItemText primary={props.name} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  );
}

function getStudentDisplayName(student) {
  if (student.last_name) return student.first_name + " " + student.last_name;
  return student.first_name;
}

export default function SidePanel(props) {
  const { students } = useLoaderData();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Button
        variant="outlined"
        sx={{ ml: "auto", mr: "auto", mt: 2, mb: 2 }}
        component={Link}
        to="/students/new"
      >
        New Student
      </Button>
      <Divider></Divider>
      {students.length ? (
        <List>
          {students.map((student) => (
            <SidePanelLink
              name={getStudentDisplayName(student)}
              key={student.id}
              studentId={student.id}
              to={`students/${student.id}`}
            />
          ))}
        </List>
      ) : (
        <Typography sx={{ ml: 2, mt: 2 }}>
          <i>No students</i>
        </Typography>
      )}
      <Divider sx={{ mt: "auto" }}></Divider>
      <List>
        <BottomLink name="Admin" url="/admin" />
        <BottomLink name="API" url="/api" />
      </List>
    </Drawer>
  );
}
