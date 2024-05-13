import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { postTask } from "@/hooks/dataTable";
import { useAuth } from "@/auth/useAuth";

export function ModalAddTask({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const auth = useAuth();

  const handleSaveChanges = async () => {
    try {
      await postTask(auth.getUser()?.id, title, description);
      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right">Task name</Label>
            <Input
              className="col-span-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right">Content</Label>
            <Textarea
              className="col-span-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type your description here."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={handleSaveChanges}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
