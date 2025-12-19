import NoteItem from "./NoteItem";
import type { Note } from "../types/note";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
  onUpdateNote: (note: Note) => void;
}

export default function NoteList({
  notes,
  selectedNoteId,
  onSelectNote,
  onDeleteNote,
  onUpdateNote
}: NoteListProps) {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedNoteId}
          onClick={() => onSelectNote(note.id)}
          onDelete={() => onDeleteNote(note.id)}
          onUpdate={onUpdateNote}
        />
      ))}
    </div>
  );
}
