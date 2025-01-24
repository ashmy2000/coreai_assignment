import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, updateNote, viewNote } from "./services/api";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", content: "", category: "" });
    const [search, setSearch] = useState("");
    const [viewedNote, setViewedNote] = useState(null);
    const [showNotes, setShowNotes] = useState(false);

    // Fetch notes based on search or get all
    const fetchNotes = async (title = "") => {
        const response = await getNotes(title);
        setNotes(response.data);
        setShowNotes(true);
        setViewedNote(null); // Hide single note view when fetching all
    };

    const handleAddNote = async () => {
        if (!newNote.title || !newNote.content || !newNote.category) {
            alert("Please fill in all fields");
            return;
        }
        await addNote(newNote);
        fetchNotes(); // Refresh the list
        setNewNote({ title: "", content: "", category: "" });
    };

    const handleDeleteNote = async (title) => {
        await deleteNote(title);
        fetchNotes();
    };

    const handleUpdateNote = async (title) => {
        const updatedContent = prompt("Enter updated content:", "");
        const updatedCategory = prompt("Enter updated category:", "");
        if (updatedContent && updatedCategory) {
            const updatedNote = { content: updatedContent, category: updatedCategory };
            await updateNote(title, updatedNote);
            fetchNotes();
        }
    };

    const handleViewNote = async (title) => {
        const response = await viewNote(title);
        setViewedNote(response.data);
        setShowNotes(false); // Hide all notes when viewing a single note
    };

    const handleBackToMain = () => {
        setViewedNote(null);
        setShowNotes(false);
        setSearch("");
        setNotes([]);
    };

    const handleSearchNotes = () => {
        if (!search.trim()) {
            alert("Please enter a title to search.");
            return;
        }
        fetchNotes(search);
    };

    return (
        <div className="app-container">
            <h1>Smart Notes Organizer</h1>

            {!viewedNote && (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search notes by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={handleSearchNotes}>Search Notes</button>
                        <button onClick={() => fetchNotes()}>Get All Notes</button>
                    </div>

                    <div className="add-note-form">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Content"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newNote.category}
                            onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                        />
                        <button onClick={handleAddNote}>Add Note</button>
                    </div>
                </>
            )}

            {/* Display Notes List */}
            {showNotes && !viewedNote && (
                <div className="notes-list">
                    {notes.map((note) => (
                        <div className="note" key={note.title}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <small>Category: {note.category}</small>
                            <button onClick={() => handleViewNote(note.title)}>View</button>
                            <button onClick={() => handleUpdateNote(note.title)}>Edit</button>
                            <button className="delete" onClick={() => handleDeleteNote(note.title)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* View Single Note */}
            {viewedNote && (
                <div className="view-note">
                    <h2>Viewing Note: {viewedNote.title}</h2>
                    <p>{viewedNote.content}</p>
                    <small>Category: {viewedNote.category}</small>
                    <button onClick={() => setViewedNote(null)}>Back to Notes</button>
                    <button onClick={handleBackToMain}>Back to Main</button>
                </div>
            )}
        </div>
    );
}

export default App;
