import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import type { Note } from "./types/note";
import { useEffect , useState } from "react";

const initialNotes: Note[] = [
  { id: 1, title: "First Note", content: "Hello world" },
  { id: 2, title: "Second Note", content: "Another note" },
  { id: 3, title: "Third Note", content: "Keep learning" },
];

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // CREATE
  const addNote = () => {
    const newNote: Note = {
      id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
      title: "New Note",
      content: "Type here...",
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  // UPDATE
  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
  };

  // DELETE
  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  return (
    <div>
      <Header />
      <button onClick={addNote}>+ New Note</button>
      <NoteList
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onDeleteNote={deleteNote}
        onUpdateNote={updateNote}
      />
      <NoteEditor note={selectedNote} onChange={updateNote} />
    </div>
  );
}


export default App;
