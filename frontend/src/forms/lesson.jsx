import * as React from "react";
import { Form, useLoaderData } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createLesson, getStudents } from "../api";

const today = new Date();

function getDisplayName(student) {
  return student.last_name
    ? student.first_name + " " + student.last_name
    : student.first_name;
}

export async function loader({ params }) {
  const students = await getStudents();
  var studentOptions = [];

  for (let i in students) {
    var student = students[i];
    studentOptions.push({
      studentId: student.id,
      studentName: getDisplayName(student),
      selected: student.id === parseInt(params.studentId) ? true : false,
    });
  }

  return { studentOptions };
}

export default function LessonForm() {
  const [student, setStudent] = React.useState("");
  const [lessonDatetime, setLessonDatetime] = React.useState(
    dayjs(today.toISOString())
  );
  const [lessonDuration, setLessonDuration] = React.useState("45");
  const [location, setLocation] = React.useState("WPMA");
  const [room, setRoom] = React.useState("A2");
  const [isTrial, setIsTrial] = React.useState(false);

  const { studentOptions } = useLoaderData();

  if (studentOptions && studentOptions.length > 0 && student === "") {
    for (let i in studentOptions) {
      if (studentOptions[i].selected) {
        setStudent(studentOptions[i].studentId);
      }
    }
  }

  function strip(val) {
    return val ? val : null;
  }

  async function submitForm() {
    // todo: figure out how to use react router actions instead
    let formData = {
      student: strip(student),
      lesson_datetime: strip(lessonDatetime),
      lesson_duration_minutes: strip(lessonDuration),
      location: strip(location),
      room: strip(room),
      is_trial: isTrial,
    };
    await createLesson(formData);
    // todo: handle errors
    window.location = "/students/" + student;
  }

  return (
    <Form autoComplete="off" aria-autocomplete="off" method="post">
      <Typography variant="h4">Add New Lesson</Typography>
      <Divider sx={{ mt: 2, width: "100%" }}></Divider>
      <Box sx={{ mt: 3 }}>
        <FormControl variant="outlined" sx={{ minWidth: 515, mr: 2, mt: 3 }}>
          <InputLabel id="student-select-label">Student</InputLabel>
          <Select
            labelId="student-select-label"
            id="student-select"
            name="student-select"
            label="Student"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
          >
            {studentOptions.map((option) => (
              <MenuItem key={option.studentId} value={option.studentId}>
                {option.studentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            required
            label="Lesson Date"
            sx={{ mr: 2, mt: 3, width: 250 }}
            value={lessonDatetime}
            onChange={(newValue) => setLessonDatetime(newValue)}
          />
        </LocalizationProvider>
        <FormControl variant="outlined" sx={{ minWidth: 250, mr: 2, mt: 3 }}>
          <InputLabel id="duration-select-label">Duration</InputLabel>
          <Select
            labelId="duration-select-label"
            id="duration-select"
            name="duration-select"
            label="Duration"
            value={lessonDuration}
            onChange={(event) => {
              setLessonDuration(event.target.value);
            }}
          >
            <MenuItem value="30">30 minutes</MenuItem>
            <MenuItem value="45">45 minutes</MenuItem>
            <MenuItem value="60">60 minutes</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl variant="outlined" sx={{ minWidth: 250, mr: 2, mt: 3 }}>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            name="location-select"
            label="Location"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          >
            <MenuItem value="WPMA">WPMA</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 250, mr: 2, mt: 3 }}>
          <InputLabel id="room-select-label">Room Number</InputLabel>
          <Select
            labelId="room-select-label"
            id="room-select"
            name="room-select"
            label="Room Number"
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          >
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem>
            <MenuItem value="A5">A5</MenuItem>
            <MenuItem value="A6">A6</MenuItem>
            <MenuItem value="A7">A7</MenuItem>
            <MenuItem value="A8">A8</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControlLabel
          sx={{ mt: 1 }}
          control={
            <Checkbox
              checked={isTrial}
              onChange={() => {
                setIsTrial(!isTrial);
              }}
            />
          }
          label="Trial Lesson"
        />
      </Box>
      <Button
        variant="outlined"
        color="success"
        sx={{ mt: 4 }}
        onClick={submitForm}
      >
        Create
      </Button>
    </Form>
  );
}
