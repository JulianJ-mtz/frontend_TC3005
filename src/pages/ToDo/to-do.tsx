import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../ToDo/data-table";
import { columns, TaskT } from "../ToDo/colums";

import { fetchAllTasks } from "@/hooks/dataTable";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/useAuth";
import { FinishSession } from "@/components/log-out";

async function getTable(id: string | undefined) {
  try {
    const response = await fetchAllTasks(id);
    const dataProducts = await response.json();
    return dataProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export function ToDo() {
  const [data, setData] = useState<TaskT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getTable(auth.getUser()?.id);
        setData(productsData);
        console.log({ productsData });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [auth]);

  return (
    <>
      <div className="absolute top-0 right-12 p-5">
        <FinishSession />
      </div>

      <div className="flex flex-col items-center bg-gradient-to-b from-background from-15% to-primary/20 dark:to-primary/5 h-screen">
        <div className="flex pt-40 font-semibold text-5xl text-center">
          <p>To-Do de {auth.getUser()?.username || ""}</p>
          <div className="flex items-center px-3">
            <Button variant={"outline"} size="icon">
              <Plus />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-gray-500 font-semibold">
            loading...
          </div>
        ) : (
          <div className="w-[70%] pt-10">
            <DataTable columns={columns} data={data} />
          </div>
        )}
      </div>
    </>
  );
}
