import type { Note } from "../types/note";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

export default function NoteItem({ note, isSelected, onClick }: NoteItemProps) {
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
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}
