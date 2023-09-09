import { Link, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { getStudent } from "../api";

export async function loader({ params }) {
  const student = await getStudent(params.studentId);
  return { student };
}

function getDisplayName(student) {
  return student.first_name || student.last_name
    ? student.first_name + " " + student.last_name
    : "No Name";
}

function renderActionButtons() {
  return (
    <Box>
      <Button
        disabled
        type="submit"
        variant="outlined"
        sx={{ display: "inline", mr: 2 }}
      >
        Edit
      </Button>
      <Button
        disabled
        type="submit"
        variant="outlined"
        color="error"
        sx={{ display: "inline" }}
      >
        Delete
      </Button>
    </Box>
  );
}

function renderLessons(lesson_data, label) {
  if (lesson_data.length > 0) {
    return (
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            {/* TODO: fill container instead of hardcoding width */}
            <List component="div" sx={{ width: 1150 }}>
              <ListItem>
                <Grid container sx={{ ml: 2, mr: 2, fontWeight: "bold" }}>
                  <Grid item xs={2}>
                    Lesson #
                  </Grid>
                  <Grid item xs={2}>
                    Date
                  </Grid>
                  <Grid item xs={2}>
                    Time
                  </Grid>
                  <Grid item xs={2}>
                    Duration
                  </Grid>
                  <Grid item xs={2}>
                    Location
                  </Grid>
                  <Grid item xs={2}>
                    Room
                  </Grid>
                </Grid>
              </ListItem>
              {lesson_data.map((row) => (
                <ListItem key={row.id}>
                  <ListItemButton component={Link} to={"/lessons/" + row.id}>
                    <Grid container>
                      <Grid item xs={2}>
                        {row.lesson_number}
                      </Grid>
                      <Grid item xs={2}>
                        {new Date(row.lesson_datetime).toDateString()}
                      </Grid>
                      <Grid item xs={2}>
                        {new Date(row.lesson_datetime).toLocaleTimeString()}
                      </Grid>
                      <Grid item xs={2}>
                        {row.lesson_duration_minutes} min
                      </Grid>
                      <Grid item xs={2}>
                        {row.location}
                      </Grid>
                      <Grid item xs={2}>
                        {row.room}
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Typography sx={{ mt: 2 }}>
        <i>None Found</i>
      </Typography>
    );
  }
}

export default function Student() {
  const { student } = useLoaderData();

  return (
    <Box id="student">
      <Typography variant="h2" sx={{ display: "inline-block" }}>
        {getDisplayName(student)}{" "}
        <Typography
          variant="body1"
          sx={{ display: "inline-block", fontSize: 20 }}
        >
          ({student.primary_instrument})
        </Typography>
      </Typography>

      <Divider sx={{ mt: 1, mb: 1 }}></Divider>

      <Box sx={{ mt: 3 }} id="student-details">
        {renderActionButtons()}
      </Box>

      <Box sx={{ mt: 6 }} id="lesson-tables">
        <Typography variant="h4" sx={{ display: "inline-block" }}>
          Lessons{" "}
          <Button
            sx={{ ml: 3 }}
            variant="outlined"
            component={Link}
            to={"/students/" + student.id + "/lessons/new"}
          >
            Add
          </Button>
        </Typography>
        <Box id="upcoming-lessons-table" sx={{ mt: 4 }}>
          <Typography variant="h5">Upcoming Lessons</Typography>
          {renderLessons(student.upcoming_lessons, "upcoming-lessons-table")}
        </Box>
        <Box id="previous-lessons-table" sx={{ mt: 4 }}>
          <Typography variant="h5">Previous Lessons</Typography>
          {renderLessons(student.previous_lessons, "previous-lessons-table")}
        </Box>
      </Box>
    </Box>
  );
}
