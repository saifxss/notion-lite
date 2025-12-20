import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import type { Note } from "./types/note";
import { useEffect , useState } from "react";
import "./App.css";

const initialNotes: Note[] = [
  { id: 1, title: "First Note", content: "Hello world", updatedAt: Date.now() },
  { id: 2, title: "Second Note", content: "Another note", updatedAt: Date.now() },
  { id: 3, title: "Third Note", content: "Keep learning", updatedAt: Date.now() },
];

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") ?? "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === "light" ? "dark" : "light"));
  };

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [search, setSearch] = useState("");
  
  const sortedNotes = [...notes].sort(
    (a, b) => b.updatedAt - a.updatedAt
  );

  const filteredNotes = sortedNotes.filter(note =>
    note.title.toLowerCase().includes(search.trim().toLowerCase()) ||
    note.content.toLowerCase().includes(search.trim().toLowerCase())
  );

  useEffect(() => {
    if (selectedNoteId && !filteredNotes.some(n => n.id === selectedNoteId)) {
      setSelectedNoteId(null);
    }
  }, [search]);
  
  // CREATE
  const addNote = () => {
    setSearch("");
    const newNote: Note = {
      id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
      title: "New Note",
      content: "Type here...",
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  // UPDATE
  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(n => n.id === updatedNote.id
       ? { ...updatedNote, updatedAt: Date.now() }
       : n
      )
    );
  };

  // DELETE
  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      // New note
      if (ctrl && e.key === "n") {
        e.preventDefault();
        addNote();
      }

      // Save note
      if (ctrl && e.key === "s") {
        e.preventDefault();
        if (selectedNote) {
          updateNote(selectedNote);
        }
      }

      // Delete note
      if (ctrl && e.key === "Backspace") {
        e.preventDefault();
        if (selectedNote) {
          deleteNote(selectedNote.id);
        }
      }

      // Escape → deselect
      if (e.key === "Escape") {
        setSelectedNoteId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNote, notes]);


  return (
    <div>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-layout">
        <aside className="sidebar">
          <input
            className="search-input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <NoteList
            notes={filteredNotes}
            onAddNote={addNote}
            selectedNoteId={selectedNoteId}
            onSelectNote={setSelectedNoteId}
            onDeleteNote={deleteNote}
          />
        </aside>
        <section className="editor-area">
          <NoteEditor note={selectedNote} onChange={updateNote} />
        </section>
      </main>
    </div>
  );
}


export default App;
