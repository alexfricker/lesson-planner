import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { createReminder } from "../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

export default function AddReminderModal() {
  const [open, setOpen] = React.useState(false);
  const [newReminder, setNewReminder] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleReminderPost() {
    if (newReminder) {
      await createReminder(newReminder);
      location.reload();
    }
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ mt: 1 }}
        variant="outlined"
        color="secondary"
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-reminder-modal-title"
        aria-describedby="add-reminder-modal-description"
      >
        <Box sx={style}>
          <Typography id="add-reminder-modal-title" variant="h6" component="h2">
            Add new Reminder
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <TextField
            id="new-reminder-field"
            name="new-reminder-field"
            label="New Reminder"
            multiline
            rows={2}
            sx={{ mt: 2, width: 350 }}
            value={newReminder}
            onChange={(event) => {
              setNewReminder(event.target.value);
            }}
          ></TextField>
          <Button
            onClick={handleReminderPost}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
