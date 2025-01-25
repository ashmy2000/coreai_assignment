import axios from "axios";

// Use the backend's deployed live URL
const API_URL = "https://coreai-assignment-1.onrender.com/api/v1/notes";

// Fetch all notes or search by title
export const getNotes = (title = "") => {
    return axios.get(API_URL, { params: { title } });
};

// Add a new note
export const addNote = (note) => {
    return axios.post(API_URL, note);
};

// Delete a note by title
export const deleteNote = (title) => {
    return axios.delete(API_URL, { params: { title } });
};

// Update a note by title
export const updateNote = (title, updatedNote) => {
    return axios.put(`${API_URL}/${title}`, updatedNote);
};

// View a single note by title (optional, if required separately)
export const viewNote = (title) => {
    return axios.get(`${API_URL}`, { params: { title } });
};
