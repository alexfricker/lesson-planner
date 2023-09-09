import * as React from "react";
import { Form } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { MuiTelInput } from "mui-tel-input";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createStudent } from "../api";

export default function StudentForm() {
  const [studentFirstName, setStudentFirstName] = React.useState("");
  const [studentLastName, setStudentLastName] = React.useState("");
  const [studentAge, setStudentAge] = React.useState("");
  const [parentFirstName, setParentFirstName] = React.useState("");
  const [parentLastName, setParentLastName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactPhone, setContactPhone] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [instrument, setInstrument] = React.useState("");
  const [level, setLevel] = React.useState("");

  function strip(val) {
    return val ? val : null;
  }

  function strip_phone(val) {
    return val === "+1" ? null : val;
  }

  async function submitForm() {
    // todo: figure out how to use react router actions instead
    let formData = {
      first_name: strip(studentFirstName),
      last_name: strip(studentLastName),
      parent_first_name: strip(parentFirstName),
      parent_last_name: strip(parentLastName),
      contact_email: strip(contactEmail),
      contact_phone: strip_phone(strip(contactPhone)),
      primary_instrument: strip(instrument),
      level: strip(level),
      grade_school: strip(school),
      age: strip(studentAge),
      grade: strip(grade),
      csrfmiddlewaretoken: "fake",
    };
    await createStudent(formData);
    // todo: handle errors
    window.location = "/";
  }

  return (
    <Form autoComplete="off" aria-autocomplete="off" method="post">
      <Typography variant="h4">Add New Student</Typography>
      <Divider sx={{ mt: 2, width: "100%" }}></Divider>
      <Box sx={{ mt: 3 }}>
        <TextField
          required
          id="student-first-name"
          name="student-first-name"
          label="First Name"
          variant="standard"
          sx={{ mr: 2 }}
          autoComplete="off"
          placeholder={studentFirstName}
          value={studentFirstName}
          onChange={(event) => {
            setStudentFirstName(event.target.value);
          }}
        />
        <TextField
          id="student-last-name"
          name="student-last-name"
          label="Last Name"
          variant="standard"
          sx={{ mr: 2 }}
          autoComplete="off"
          placeholder={studentLastName}
          value={studentLastName}
          onChange={(event) => {
            setStudentLastName(event.target.value);
          }}
        />
        <TextField
          id="student-age"
          name="student-age"
          label="Age"
          variant="standard"
          type="number"
          sx={{ mr: 2 }}
          autoComplete="off"
          placeholder={studentAge}
          value={studentAge}
          onChange={(event) => {
            setStudentAge(event.target.value);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <TextField
          id="parent-first-name"
          name="parent-first-name"
          label="Parent First Name"
          variant="standard"
          sx={{ mr: 2 }}
          autoComplete="off"
          placeholder={parentFirstName}
          value={parentFirstName}
          onChange={(event) => {
            setParentFirstName(event.target.value);
          }}
        />
        <TextField
          id="parent-last-name"
          name="parent-last-name"
          label="Parent Last Name"
          variant="standard"
          sx={{ mr: 2 }}
          autoComplete="off"
          placeholder={parentLastName}
          value={parentLastName}
          onChange={(event) => {
            setParentLastName(event.target.value);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <TextField
          required
          id="contact-email"
          name="contact-email"
          label="Email"
          variant="standard"
          sx={{ mr: 2, minWidth: 350 }}
          autoComplete="off"
          placeholder={contactEmail}
          value={contactEmail}
          onChange={(event) => {
            setContactEmail(event.target.value);
          }}
        />
        <MuiTelInput
          id="contact-phone"
          name="contact-phone"
          label="Phone"
          variant="standard"
          sx={{ mr: 2, minWidth: 200 }}
          autoComplete="off"
          defaultCountry="US"
          value={contactPhone}
          onChange={(newValue) => {
            setContactPhone(newValue);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <TextField
          id="school"
          name="school"
          label="School"
          variant="standard"
          sx={{ mr: 2, minWidth: 350 }}
          autoComplete="off"
          placeholder={school}
          value={school}
          onChange={(event) => {
            setSchool(event.target.value);
          }}
        />
        <TextField
          id="school-grade"
          name="school-grade"
          label="Grade"
          variant="standard"
          type="number"
          sx={{ mr: 2, minWidth: 200 }}
          autoComplete="off"
          placeholder={grade}
          value={grade}
          onChange={(event) => {
            setGrade(event.target.value);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormControl variant="standard" sx={{ minWidth: 250, mr: 2 }} required>
          <InputLabel id="instrument-select-label">Instrument</InputLabel>
          <Select
            labelId="instrument-select-label"
            id="student-instrument-select"
            name="student-instrument-select"
            label="Instrument"
            value={instrument}
            onChange={(event) => {
              setInstrument(event.target.value);
            }}
          >
            <MenuItem value="oboe">Oboe</MenuItem>
            <MenuItem value="saxophone">Saxophone</MenuItem>
            <MenuItem value="piano">Piano</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250 }} required>
          <InputLabel id="level-select-label">Playing Level</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            name="level-select"
            label="Level"
            value={level}
            onChange={(event) => {
              setLevel(event.target.value);
            }}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        color="success"
        sx={{ mt: 6 }}
        onClick={submitForm}
      >
        Create
      </Button>
    </Form>
  );
}
