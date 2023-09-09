import * as React from "react";
import { Link, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { getLesson, createLessonNote, destroyLessonNote } from "../api";

export async function loader({ params }) {
  const lesson = await getLesson(params.lessonId);
  return { lesson };
}

function getDisplayName(student) {
  return student.first_name || student.last_name
    ? student.first_name + " " + student.last_name
    : "No Name";
}

function getLessonTimeDisplay(lesson_date, lesson_duration) {
  var ret_string = "";
  if (lesson_date) {
    var exp_date = new Date(lesson_date.getTime() + lesson_duration * 60000);
    ret_string = ret_string + lesson_date.toDateString() + ", ";
    ret_string = ret_string + lesson_date.toLocaleTimeString() + " - ";
    ret_string = ret_string + exp_date.toLocaleTimeString();
  }
  return ret_string;
}

function getRoomDisplay(lesson) {
  if (lesson.location && lesson.room) {
    return lesson.location + ": " + lesson.room;
  }
}

async function handleNoteDelete(noteId) {
  const response = await destroyLessonNote(noteId);
  location.reload();
}

function renderNotes(notes) {
  if (notes && notes.length > 0) {
    return (
      <Box id="previous-notes">
        {notes.map((note) => (
          <Paper key={note.id} sx={{ mt: 2 }}>
            <Typography sx={{ p: 2, display: "inline-flex" }} variant="body1">
              {note.note_text}
            </Typography>
            <Button
              sx={{ display: "inline-flex" }}
              onClick={() => handleNoteDelete(note.id)}
            >
              Delete
            </Button>
          </Paper>
        ))}
      </Box>
    );
  }
}

function renderPreviousLessonButton(previousLessonId) {
  if (previousLessonId) {
    return (
      <Button
        variant="outlined"
        sx={{ mt: 2, mr: 2 }}
        component={Link}
        to={"/lessons/" + previousLessonId}
      >
        Previous Lesson
      </Button>
    );
  }
}

function renderNextLessonButton(nextLessonId) {
  if (nextLessonId) {
    return (
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        component={Link}
        to={"/lessons/" + nextLessonId}
        color="secondary"
      >
        Next Lesson
      </Button>
    );
  }
}

export default function Lesson() {
  const [newNote, setNewNote] = React.useState("");
  const { lesson } = useLoaderData();
  const lesson_date = lesson ? new Date(lesson.lesson_datetime) : null;

  async function handleNotePost() {
    if (newNote) {
      await createLessonNote(lesson.id, newNote);
      location.reload();
    }
  }

  return (
    <Box id="lesson">
      <Typography variant="h2" sx={{ display: "inline-block" }}>
        {getDisplayName(lesson.student)}{" "}
        <Typography
          variant="body1"
          sx={{ display: "inline-block", fontSize: 20 }}
        >
          ({lesson.student.primary_instrument})
        </Typography>
      </Typography>

      <Divider sx={{ mt: 1, mb: 1 }}></Divider>

      <Typography>
        {getLessonTimeDisplay(lesson_date, lesson.lesson_duration_minutes)} (
        {lesson.lesson_duration_minutes} minutes)
      </Typography>

      <Typography sx={{ mt: 1 }}>{getRoomDisplay(lesson)}</Typography>

      {renderPreviousLessonButton(lesson.previous_lesson)}
      {renderNextLessonButton(lesson.next_lesson)}

      <Typography variant="h4" sx={{ mt: 3 }}>
        Notes
      </Typography>

      <Box id="notes">
        {renderNotes(lesson.notes)}
        <TextField
          id="new-note-field"
          name="new-note-field"
          label="New Note"
          multiline
          rows={2}
          sx={{ width: 800, mt: 2 }}
          value={newNote}
          onChange={(event) => {
            setNewNote(event.target.value);
          }}
        ></TextField>
        <Button
          variant="outlined"
          sx={{ display: "block", mt: 2 }}
          color="success"
          onClick={handleNotePost}
        >
          Save
        </Button>
      </Box>
      <Tooltip title="Send a lesson recap email to parent/student. Opens a preview with lesson notes and assignments.">
        <Button sx={{ mt: 2 }} variant="outlined" color="secondary" disabled>
          Send Recap Email
        </Button>
      </Tooltip>
    </Box>
  );
}
