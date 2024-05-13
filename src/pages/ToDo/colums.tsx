import { ColumnDef } from "@tanstack/react-table";

import { StatusCell } from "@/components/table-status";
import { ActionsTask } from "@/components/actions-task";

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
    cell: ({ row }) => StatusCell(row.original.status, row.original.id),
  },
  {
    id: "actions",
    header: () => <div className="flex justify-center"> Action</div>,
    cell: ({ row }) => ActionsTask(row.original.id),
  },
];
