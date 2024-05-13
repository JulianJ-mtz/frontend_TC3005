// import React, { createContext, useContext, useState, useEffect } from "react";
// import { fetchAllTasks } from "@/hooks/dataTable";
// import { TaskT } from "../ToDo/colums";

// // Definir el tipo para el contexto
// interface TableDataContextType {
//   data: TaskT[];
//   loading: boolean;
//   setTableData: (data: TaskT[]) => void;
//   setLoadingState: (loading: boolean) => void;
// }

// interface TableProvider {
//   children: React.ReactNode;
// }

// // Crear el contexto
// const TableDataContext = createContext<TableDataContextType | undefined>(
//   undefined
// );

// // Hook para usar el contexto
// export const useTableData = () => {
//   const context = useContext(TableDataContext);
//   if (!context) {
//     throw new Error(
//       "useTableData debe ser usado dentro de un TableDataProvider"
//     );
//   }
//   return context;
// };

// // Proveedor del contexto
// export function TableDataProvider({ children }: TableProvider) {
//   const [data, setData] = useState<TaskT[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const setTableData = (newData: TaskT[]) => {
//     setData(newData);
//   };

//   const setLoadingState = (isLoading: boolean) => {
//     setLoading(isLoading);
//   };

//   return (
//     <TableDataContext.Provider
//       value={{ data, loading, setTableData, setLoadingState }}
//     >
//       {children}
//     </TableDataContext.Provider>
//   );
// }
