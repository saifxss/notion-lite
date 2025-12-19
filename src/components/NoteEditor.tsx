import type { Note } from "../types/note";

interface NoteEditorProps {
  note: Note | null;
  onChange: (updatedNote: Note) => void;
}

export default function NoteEditor({ note, onChange }: NoteEditorProps) {
  if (!note) {
    return <p>Select a note to edit</p>;
  }

  return (
    <div className="note-editor">
      <input className="note-title"
        value={note.title}
        onChange={(e) => onChange({ ...note, title: e.target.value })}
      />

      <textarea className="note-content"
        value={note.content}
        onChange={(e) => onChange({ ...note, content: e.target.value })}
      />
    </div>
  );
}
