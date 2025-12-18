import Header from "./components/Header";
import NoteList from "./components/NoteList";
import type { Note } from "./types/note";
import { useState } from "react";


const mockNotes: Note[] = [
  { id: 1, title: "First Note", content: "Hello world" },
  { id: 2, title: "Second Note", content: "Another note" },
  { id: 3, title: "Third Note", content: "Keep learning" },
  { id: 4, title: "Fourth Note", content: "Build projects" },
];

function App() {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  return (
    <div>
      <Header />
      <main>
        <NoteList
          notes={mockNotes}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
        />
      </main>
    </div>
  );
}

export default App;
