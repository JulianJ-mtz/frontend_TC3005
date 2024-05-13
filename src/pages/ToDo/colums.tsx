
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StatusCell } from "@/components/table-status";

export type TaskT = {
  id: string;
  title: string;
  content: string;
  status: string;
};

export const columns: ColumnDef<TaskT>[] = [
  {
    accessorKey: "title",
    header: () => <div className="flex  justify-start ps-2"> Title</div>,
    cell: ({ row }) => {
      const title = row.original;
      return (
        <>
          <div className="flex  justify-start ps-2"> {title.title} </div>
        </>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: () => <div className="flex justify-center">Status</div>,
    cell: ({ row }) => StatusCell(row.original.status, row.original.id)
    // ({ row }) => {

    //   const task = row.original;

    //   return (
    //     <>
    //       <div className="flex justify-center items-center">
    //         <div className=" flex items-center h-[25px]">
    //           {task.status === "not_started" ? (
    //             <Badge variant={"secondary"}>Not Started</Badge>
    //           ) : task.status === "in_progress" ? (
    //             <Badge variant={"outline"}>In Progress</Badge>
    //           ) : (
    //             <Badge variant={"default"}>Done</Badge>
    //           )}
    //         </div>

    //         <div className="ps-2 flex items-center">
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button variant="ghost" className="h-6 w-6 p-0">
    //                 <span className="sr-only">Open menu</span>
    //                 <ChevronDown className="h-4 w-4" />
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="center">
    //               {/* <DropdownMenuLabel>Change status</DropdownMenuLabel>
    //               <DropdownMenuSeparator /> */}
    //               <DropdownMenuItem
    //                 onClick={() => changeTaskState(task.id, "not_started")}
    //               >
    //                 <Badge variant={"secondary"}>Not Started</Badge>
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => changeTaskState(task.id, "in_progress")}
    //               >
    //                 <Badge variant={"outline"}>In Progress</Badge>
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => changeTaskState(task.id, "done")}
    //               >
    //                 <Badge variant={"default"}>Done</Badge>
    //               </DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>
    //         </div>
    //       </div>
    //     </>
    //   );
    // },
  },
  {
    id: "actions",
    header: () => <div className="flex justify-center"> Action</div>,
    cell: ({ row }) => {
      const produtct = row.original;

      return (
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
                onClick={() =>
                  navigator.clipboard.writeText(String(produtct.id))
                }
              >
                Copy payment ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
