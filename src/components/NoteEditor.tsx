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
    <div>
      <input
        value={note.title}
        onChange={(e) =>
          onChange({ ...note, title: e.target.value })
        }
      />

      <textarea
        value={note.content}
        onChange={(e) =>
          onChange({ ...note, content: e.target.value })
        }
      />
    </div>
  );
}
