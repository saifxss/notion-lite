import type { Note } from "../types/note";
import { useState } from "react";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onUpdate: (note: Note) => void;
}

export default function NoteItem({ note, isSelected, onClick, onDelete, onUpdate }: NoteItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const save = () => {
    onUpdate({ ...note, title, content });
    setEditing(false);
  };
  
 return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: isSelected ? "lightblue" : "white",
        cursor: "pointer",
      }}
    >
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={save}>Save</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </>
      )}
      <button onClick={onDelete}>Delete</button>
      {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
    </div>
  );
}
