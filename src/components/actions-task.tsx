import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteTask, editTask } from "@/hooks/dataTable";

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
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

const delTask = async (id: string) => {
  try {
    await deleteTask(id);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// const editTask =

export function ActionsTask(id: string) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveChanges = async () => {
    try {
      await editTask(id, title, description);
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => {
                delTask(id);
              }}
            >
              Delete
            </DropdownMenuItem>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col">
                  <Button className="flex justify-start h-8.1" variant={"ghost"}>Edit</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label className="text-right">Task Title</Label>
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
                    <Button
                      type="submit"
                      variant="default"
                      onClick={handleSaveChanges}
                    >
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
