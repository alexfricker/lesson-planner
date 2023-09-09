import localforage from "localforage";
import sortBy from "sort-by";

const ENDPOINTS = {
  students: "/api/students",
  lessons: "/api/lessons",
  lessonNotes: "/api/lesson_notes",
  reminders: "/api/reminders",
};

export async function getStudents() {
  let contacts = [];
  let response = await fetch(ENDPOINTS.students);
  let contacts_json = await response.json();
  if (contacts_json) contacts = contacts_json.results;
  return contacts.sort(sortBy("last_name", "id"));
}

export async function createStudent(formData) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  let response = await fetch(ENDPOINTS.students, options);
  let response_json = await response.json();
  return response_json;
}

export async function getStudent(id) {
  let contact = await fetch(ENDPOINTS.students + "/" + id);
  let contact_json = await contact.json();
  return contact_json ?? null;
}

// export async function updateStudent(id, updates) {
//   await fakeNetwork();
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find((contact) => contact.id === id);
//   if (!contact) throw new Error("No contact found for", id);
//   Object.assign(contact, updates);
//   await set(contacts);
//   return contact;
// }

// export async function deleteStudent(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex((contact) => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

export async function getLessons() {
  let lessons = [];
  let response = await fetch(ENDPOINTS.lessons);
  let lessons_json = await response.json();
  if (lessons_json) lessons = lessons_json.results;
  return lessons.sort(sortBy("lesson_datetime"));
}

export async function getUpcomingLessons() {
  let response = await fetch(ENDPOINTS.lessons + "?upcoming=true");
  let lessons_json = await response.json();
  return lessons_json;
}

export async function getLesson(id) {
  let lesson = await fetch(ENDPOINTS.lessons + "/" + id);
  let lesson_json = await lesson.json();
  return lesson_json ?? null;
}

export async function createLesson(formData) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  let response = await fetch(ENDPOINTS.lessons, options);
  let response_json = await response.json();
  return response_json;
}

export async function createLessonNote(lessonId, noteText) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      note_text: noteText,
    }),
  };
  let response = await fetch(
    ENDPOINTS.lessons + "/" + lessonId + "/add_note",
    options
  );
  let response_json = await response.json();
  return response_json;
}

export async function destroyLessonNote(noteId) {
  var options = {
    method: "DELETE",
  };
  let response = await fetch(ENDPOINTS.lessonNotes + "/" + noteId, options);
  return response;
}

export async function getReminders() {
  let response = await fetch(ENDPOINTS.reminders);
  let json = await response.json();
  return json.results;
}

export async function dismissReminder(reminderId) {
  var options = {
    method: "DELETE",
  };

  let response = await fetch(ENDPOINTS.reminders + "/" + reminderId, options);
  return response;
}

export async function createReminder(reminderText) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reminder_text: reminderText,
    }),
  };

  let response = await fetch(ENDPOINTS.reminders, options);
  let json = await response.json()
  return json;
}