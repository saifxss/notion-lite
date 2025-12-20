import type { Note } from "../types/note";

export function hasChanges(note: Note, title: string, content: string): boolean {
  return note.title !== title || note.content !== content;
}