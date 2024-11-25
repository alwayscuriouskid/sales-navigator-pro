import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useInventoryTypes, useDeleteInventoryType } from "@/hooks/useInventory";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface ManageTypeDialogProps {
  children?: React.ReactNode;
}

export const ManageTypeDialog = ({ children }: ManageTypeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const { data: types } = useInventoryTypes();
  const deleteType = useDeleteInventoryType();

  const handleDelete = async () => {
    if (!selectedTypeId) return;
    try {
      await deleteType.mutateAsync(selectedTypeId);
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting type:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children || (
            <Button variant="outline" className="bg-background text-foreground">
              <Settings2 className="mr-2 h-4 w-4" />
              Manage Types
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Inventory Types</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {types?.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-2 rounded border">
                <span>{type.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedTypeId(type.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Inventory Type"
        description="Are you sure you want to delete this inventory type? This action cannot be undone."
      />
    </>
  );
};