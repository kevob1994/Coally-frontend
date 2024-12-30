import { Column } from "@components";
import { ITask } from "@interfaces/task.interface";

export const COLUMNS_POST: Column<ITask>[] = [
  { Header: "Title", accessor: "title" },
  { Header: "Description", accessor: "description" },
  { Header: "Status", accessor: "completed" },
  { Header: "Creation date", accessor: "createdAt" },
];

export const STATUS_TASKS = [
  { value: "all", label: "All" },
  { value: "true", label: "completed" },
  { value: "false", label: "pending" },
];
