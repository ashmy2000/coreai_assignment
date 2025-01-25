import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "" // For deployment, use relative paths
    : "http://127.0.0.1:8000/api/v1/notes"; // For local development, use the full backend URL


// Fetch all notes or search by title
export const getNotes = (title = "") => axios.get(API_URL, { params: { title } });

// Add a new note
export const addNote = (note) => axios.post(API_URL, note);

// Delete a note by title
export const deleteNote = (title) => axios.delete(API_URL, { params: { title } });

// Update a note by title
export const updateNote = (title, updatedNote) =>
    axios.put(`${API_URL}/${title}`, updatedNote);

// Get notes grouped by category
export const getGroupedNotes = () => axios.get(`${API_URL}/grouped`);
