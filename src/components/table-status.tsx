import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { changeTaskState } from "@/hooks/dataTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { useState } from "react";

export function StatusCell(status: string, id: string) {
  const [state, setState] = useState(status);

  const handleChangeState = async (taskId: string, taskState: string) => {
    try {
      await changeTaskState(taskId, taskState);
      setState(taskState);
    } catch (error) {
      console.error("Error cambiando el estado de la tarea:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" flex items-center h-[25px]">
          {state === "not_started" ? (
            <Badge variant={"secondary"}>Not Started</Badge>
          ) : state === "in_progress" ? (
            <Badge variant={"outline"}>In Progress</Badge>
          ) : state === "done" ? (
            <Badge variant={"default"}>Done</Badge>
          ) : (
            ""
          )}
        </div>

        <div className="ps-2 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-6 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                onClick={() => handleChangeState(id, "not_started")}
              >
                <Badge variant={"secondary"}>Not Started</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeState(id, "in_progress")}
              >
                <Badge variant={"outline"}>In Progress</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeState(id, "done")}>
                <Badge variant={"default"}>Done</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
