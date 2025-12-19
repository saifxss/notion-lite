import { useState, useEffect } from "react";
import type { Note } from "../types/note";

interface NoteEditorProps {
  note: Note | null;
  onChange: (updatedNote: Note) => void;
}

export default function NoteEditor({ note, onChange }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  if (!note) {
    return <p>Select a note to edit</p>;
  }

  const save = () => {
    onChange({ ...note, title, content });
  };

  const unchanged = note.title === title && note.content === content;

  return (
    <div className="note-editor">
      <input className="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea className="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="editor-actions">
        <button className="save-btn" onClick={save} disabled={unchanged}>Save</button>
      </div>
    </div>
  );
}
