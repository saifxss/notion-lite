import { useState, useEffect , useRef } from "react";
import type { Note } from "../types/note";

interface NoteEditorProps {
  note: Note | null;
  onChange: (updatedNote: Note) => void;
}

export default function NoteEditor({ note, onChange }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [note?.id]);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  if (!note) {
  return (
    <div className="text-gray-400 text-center mt-20">
      Select a note or create a new one
    </div>
  );
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
        <button className="save-btn" onClick={save} disabled={unchanged}>
            {unchanged ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
