import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, updateNote } from "./services/api";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", content: "", category: "" });
    const [search, setSearch] = useState("");
    const [viewedNote, setViewedNote] = useState(null); // Stores the selected note to be viewed
    const [editingNote, setEditingNote] = useState(null); // For handling note editing
    const [showNotes, setShowNotes] = useState(false);

    // Fetching notes from backend and grouping by category
    const fetchNotes = async (title = "") => {
        const response = await getNotes(title);
        const grouped = response.data.reduce((acc, note) => {
            acc[note.category] = acc[note.category] || [];
            acc[note.category].push(note);
            return acc;
        }, {});

        setNotes(grouped); // Store grouped notes
        setShowNotes(true); // Display the notes section
        setViewedNote(null); // Reset viewed note when notes are shown
        setEditingNote(null); // Reset editing state
    };

    const handleAddNote = async () => {
        if (!newNote.title || !newNote.content || !newNote.category) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await addNote(newNote); // Add the note to the backend
            setNewNote({ title: "", content: "", category: "" }); // Clear input fields
            window.location.reload(); // Trigger a full page refresh
        } catch (error) {
            console.error("Error adding note:", error);
            alert("An error occurred while adding the note. Please try again.");
        }
    };

    const handleDeleteNote = async (title) => {
        await deleteNote(title);
        fetchNotes();
    };

    const handleEditNote = (note) => {
        setEditingNote(note); // Open edit form for the selected note
        setShowNotes(false); // Hide notes list
    };

    const handleSaveEdit = async () => {
        if (!editingNote.title || !editingNote.content || !editingNote.category) {
            alert("Please fill in all fields");
            return;
        }
        await updateNote(editingNote.title, {
            title: editingNote.title,
            content: editingNote.content,
            category: editingNote.category,
        });
        setEditingNote(null);
        fetchNotes();
    };

    // When the "View" button is clicked, show the note's details
    const handleViewNote = (note) => {
        setViewedNote(note); // Set the note to be viewed
        setShowNotes(false); // Hide notes list
        setEditingNote(null); // Ensure editing is reset
    };

    const handleBackToMain = () => {
        setViewedNote(null); // Reset viewed note to go back to the main page
        setEditingNote(null);
        setShowNotes(true);
        setSearch("");
        setNotes([]);
    };

    const handleSearchNotes = async () => {
        if (!search.trim()) {
            alert("Please enter a title to search.");
            return;
        }
        const response = await getNotes(search); // Fetch notes matching the search query
        if (response.data.length === 0) {
            alert("No notes were found with this name.");
            return;
        }

        // Group the search results by category
        const grouped = response.data.reduce((acc, note) => {
            acc[note.category] = acc[note.category] || [];
            acc[note.category].push(note);
            return acc;
        }, {});

        setNotes(grouped); // Update the grouped notes state
        setShowNotes(true); // Display the notes section
        setViewedNote(null);
        setEditingNote(null);
    };

    return (
        <div className="app-container">
            <h1>Smart Notes Organiser</h1>

            {!viewedNote && !editingNote && (
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
                            placeholder="Note Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Note Content"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Note Category"
                            value={newNote.category}
                            onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                        />
                        <div>
                            <button onClick={handleAddNote}>Add Note</button>
                            <button onClick={() => window.location.reload()}>Refresh</button>
                        </div>
                    </div>
                </>
            )}

            {showNotes && !viewedNote && !editingNote && (
                <div className="notes-list">
                    {Object.keys(notes).map((category) => (
                        <div className="category-group" key={category}>
                            <h2>{category}</h2>
                            {notes[category].map((note) => (
                                <div className="note" key={note.title}>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <small>Category: {note.category}</small>
                                    <button onClick={() => handleViewNote(note)}>View</button>
                                    <button onClick={() => handleEditNote(note)}>Edit</button>
                                    <button
                                        className="delete"
                                        onClick={() => handleDeleteNote(note.title)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {editingNote && (
                <div className="edit-note-form">
                    <h2>Edit Note</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingNote.title}
                        onChange={(e) =>
                            setEditingNote({ ...editingNote, title: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Content"
                        value={editingNote.content}
                        onChange={(e) =>
                            setEditingNote({ ...editingNote, content: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={editingNote.category}
                        onChange={(e) =>
                            setEditingNote({ ...editingNote, category: e.target.value })
                        }
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleBackToMain}>Cancel</button>
                </div>
            )}

            {viewedNote && (
                <div className="view-note">
                    <h2>Viewing Note: {viewedNote.title}</h2>
                    <p>{viewedNote.content}</p>
                    <small>Category: {viewedNote.category}</small>
                    <button onClick={handleBackToMain}>Back to Main</button>
                </div>
            )}
        </div>
    );
}

export default App;
