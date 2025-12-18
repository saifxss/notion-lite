import Header from "./components/Header";
import NoteList from "./components/NoteList";
import type { Note } from "./types/note";

const mockNotes: Note[] = [
  { id: 1, title: "First Note", content: "Hello world" },
  { id: 2, title: "Second Note", content: "Another note" },
  { id: 3, title: "Third Note", content: "Keep learning" },
  { id: 4, title: "Fourth Note", content: "Build projects" },
];

function App() {
  return (
    <div>
      <Header />
      <main>
        <NoteList notes={mockNotes} />
      </main>
    </div>
  );
}

export default App;
