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
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  const isUnchanged = note ? (note.title === title && note.content === content) : true;

  useEffect(() => {
    titleRef.current?.focus();
  }, [note?.id]);

  useEffect(() => {
    if (!note || isUnchanged) return;
    const timeout = setTimeout(() => {
      onChange({ ...note, title, content });
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, content]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        contentRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!note) {
    return (
      <div className ="editor-empty">
        Select a note or create a new one
      </div>
    );
  }

  const save = () => {
    onChange({ ...note, title, content });
  };

  return (
    <div className="note-editor">
      <input className="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        ref={contentRef}
        className="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="editor-actions">
        <button className="save-btn" onClick={save} disabled={isUnchanged}>
            {isUnchanged ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
