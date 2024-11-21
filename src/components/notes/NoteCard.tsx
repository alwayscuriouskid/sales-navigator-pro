import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/types/notes";
import { useToast } from "@/components/ui/use-toast";
import { NoteHeader } from "./NoteHeader";
import { NoteTags } from "./NoteTags";
import Draggable from "react-draggable";

interface NoteCardProps {
  note: Note;
  onUpdate: (updatedNote: Note) => void;
  categories: string[];
  tags: string[];
}

const NoteCard = ({ note, onUpdate, categories, tags }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!editedNote.title.trim() || !editedNote.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content cannot be empty",
        variant: "destructive",
      });
      return;
    }
    onUpdate(editedNote);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Note updated successfully",
    });
  };

  const handleAddTag = () => {
    if (newTag && !editedNote.tags?.includes(newTag)) {
      setEditedNote({
        ...editedNote,
        tags: [...(editedNote.tags || []), newTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedNote({
      ...editedNote,
      tags: editedNote.tags?.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <Draggable handle=".drag-handle" bounds="parent">
      <div className="relative">
        <Card className="group hover:border-primary/50 transition-colors min-w-[300px] resize overflow-auto rounded-lg">
          <div className="absolute inset-x-0 top-0 h-6 bg-background/80 backdrop-blur-sm cursor-move drag-handle" />
          <CardHeader className="space-y-1 pt-8">
            <NoteHeader
              isEditing={isEditing}
              editedNote={editedNote}
              setEditedNote={setEditedNote}
              setIsEditing={setIsEditing}
              handleSave={handleSave}
              categories={categories}
              originalNote={note}
            />
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                className="min-h-[100px] text-sm resize-y"
                placeholder="Note Content"
              />
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {note.content}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <NoteTags
              isEditing={isEditing}
              editedNote={editedNote}
              newTag={newTag}
              setNewTag={setNewTag}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              availableTags={tags}
            />
          </CardFooter>
        </Card>
      </div>
    </Draggable>
  );
};

export default NoteCard;