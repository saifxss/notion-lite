import { useState, useEffect , useRef } from "react";
import type { Note } from "../types/note";

interface NoteEditorProps {
  note: Note | null;
  onChange: (updatedNote: Note) => void;
}

export default function NoteEditor({ note, onChange }: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setHasUnsavedChanges(false);
  }, [note]);

  const disabled = !note;

  useEffect(() => {
    titleRef.current?.focus();
  }, [note]);

  useEffect(() => {
    if (!note) return;

    const changed = !(note.title === title && note.content === content);

    if (!changed) {
      return;
    }

    setHasUnsavedChanges(true);

    const timeout = setTimeout(() => {
      onChange({ ...note, title, content });
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 500);


    return () => clearTimeout(timeout);
  }, [title, content, note, onChange]);

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
    onChange({ ...note!, title, content });
  };

  return (
    <div className="note-editor">
      <input
        disabled={disabled}
        className="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        ref={contentRef}
        disabled={disabled}
        className="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="editor-actions">
        <button
          className="save-btn"
          onClick={save}
          disabled={!hasUnsavedChanges || isSaving}
        >
          {isSaving ? "Saving..." : hasUnsavedChanges ? "Save" : "Saved"}
        </button>
      </div>
    </div>
  );
}
