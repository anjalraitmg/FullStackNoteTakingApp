import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import { getNotes, createNote, updateNote, deleteNote } from "../api";
import { useAuth } from "../context/AuthContext";

export default function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openAuth } = useAuth();

  useEffect(() => {
    let ignore = false;
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    async function fetchAllNotes() {
      setLoading(true);
      try {
        const res = await getNotes();
        if (!ignore) {
          setNotes(res.data);
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchAllNotes();

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddNote = async (newNoteData) => {
    try {
      const res = await createNote(newNoteData);
      setNotes((prev) => [res.data, ...prev]);
    } catch {
      alert("Please log in to save notes!");
      openAuth();
    }
  };

  const handleUpdateNote = async (id, updatedFields) => {
    try {
      const res = await updateNote(id, updatedFields);
      setNotes((prev) => prev.map((n) => (n.id === id ? res.data : n)));
    } catch (err) {
      console.error("Failed to update note", err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <>
      <NoteForm onAddNote={handleAddNote} />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <p className="text-lg">No notes yet. Create your first note above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}
    </>
  );
}