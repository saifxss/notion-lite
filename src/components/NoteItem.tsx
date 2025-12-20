import type { Note } from "../types/note";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function NoteItem({ note, isSelected, onClick, onDelete }: NoteItemProps) {
 return (
    <div
      className={`note-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <h3>{note.title}</h3>
      <p className="note-preview">
        {note.content.slice(0, 40)}{note.content.length > 40 ? "…" : ""}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Delete this note?")) {
            onDelete();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
