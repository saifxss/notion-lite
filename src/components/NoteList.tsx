import NoteItem from "./NoteItem";
import type { Note } from "../types/note";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
  onAddNote: () => void;
}

export default function NoteList({
  notes,
  selectedNoteId,
  onSelectNote,
  onDeleteNote,
  onAddNote
}: NoteListProps) {
  return (
    <div className="note-list">
      <div className="note-list-header">
        <button className="new-note-btn" onClick={onAddNote}>+ New Note</button>
      </div>
      <div className="note-items">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
            onClick={() => onSelectNote(note.id)}
            onDelete={() => onDeleteNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
}
