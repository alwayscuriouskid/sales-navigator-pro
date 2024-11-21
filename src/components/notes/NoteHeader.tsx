import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Edit2 } from "lucide-react";
import { Note } from "@/types/notes";

interface NoteHeaderProps {
  isEditing: boolean;
  editedNote: Note;
  setEditedNote: (note: Note) => void;
  setIsEditing: (editing: boolean) => void;
  handleSave: () => void;
  categories: string[];
  originalNote: Note;
}

export const NoteHeader = ({
  isEditing,
  editedNote,
  setEditedNote,
  setIsEditing,
  handleSave,
  categories,
  originalNote,
}: NoteHeaderProps) => {
  return (
    <>
      <div className="flex items-start justify-between">
        {isEditing ? (
          <Input
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
            className="text-base font-semibold"
            placeholder="Note Title"
          />
        ) : (
          <CardTitle className="text-base line-clamp-1">
            {originalNote.title}
          </CardTitle>
        )}
        <div className="flex gap-1">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleSave}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setIsEditing(false);
                  setEditedNote(originalNote);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {isEditing && (
        <Input
          value={editedNote.category || ""}
          onChange={(e) =>
            setEditedNote({ ...editedNote, category: e.target.value })
          }
          placeholder="Enter category"
          list="categories"
        />
      )}
      <datalist id="categories">
        {categories.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
      {!isEditing && editedNote.category && (
        <span className="text-xs text-muted-foreground">
          {editedNote.category}
        </span>
      )}
    </>
  );
};