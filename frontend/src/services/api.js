import axios from "axios";

const API_URL = "https://coreai-assignment-4.onrender.com";

// Fetch all notes or search by title
export const getNotes = (title = "") => axios.get(API_URL, { params: { title } });

// View a single note by title
export const viewNote = (title) => axios.get(`${API_URL}/view`, { params: { title } });

// Add a new note
export const addNote = (note) => axios.post(API_URL, note);

// Delete a note by title
export const deleteNote = (title) => axios.delete(API_URL, { params: { title } });

// Update a note by title
export const updateNote = (title, updatedNote) =>
    axios.put(`${API_URL}/${title}`, updatedNote);
