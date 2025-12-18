import type { Note } from "../types/note";

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <div style={{ border: "1px solid gray", padding: "8px", marginBottom: "8px" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}
