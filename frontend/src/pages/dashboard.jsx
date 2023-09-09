import { Link, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { getUpcomingLessons, getReminders, dismissReminder } from "../api";
import AddReminderModal from "../components/AddReminderModal";

export async function loader() {
  const upcoming_lessons = await getUpcomingLessons();
  const reminders = await getReminders();
  var dashboard_data = {
    upcoming_lessons: upcoming_lessons,
    reminders: reminders,
  };
  return { dashboard_data };
}

function renderLessons(lesson_data) {
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
                    Student
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
                        {row.student}
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

async function handleReminderDelete(reminderId) {
  const response = await dismissReminder(reminderId);
  location.reload();
}

function renderReminders(reminders) {
  if (reminders && reminders.length > 0) {
    return (
      <Box id="reminders" sx={{mb:1}}>
        {reminders.map((reminder) => (
          <Paper key={reminder.id} sx={{ mt: 2, width: 1150 }}>
            <Typography sx={{ p: 2, display: "inline-flex" }} variant="body1">
              {reminder.reminder_text}
            </Typography>
            <Button
              sx={{ display: "inline-flex" }}
              onClick={() => handleReminderDelete(reminder.id)}
            >
              Dismiss
            </Button>
          </Paper>
        ))}
      </Box>
    );
  }
}

export default function Dashboard() {
  const { dashboard_data } = useLoaderData();
  console.log(dashboard_data);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Upcoming Lessons</Typography>
      {renderLessons(dashboard_data.upcoming_lessons)}
      <Typography variant="h5" sx={{ mt: 5 }}>
        Reminders
      </Typography>
      {renderReminders(dashboard_data.reminders)}
      <AddReminderModal />
    </Box>
  );
}
