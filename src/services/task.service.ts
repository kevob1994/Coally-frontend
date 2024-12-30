import { ITask, TCreateTaskType } from "@interfaces";
import apiInstance from "./config-api";

export const GetTasksService = async (
  token: string,
  queryParams: Record<string, string | number>
): Promise<ITask[]> => {
  const response = await apiInstance.get<ITask[]>("/task", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: queryParams,
  });
  return response.data;
};

export const createTaskService = async (
  newTask: TCreateTaskType,
  token: string
) => {
  const response = await apiInstance.post("/task", newTask, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTaskService = async (updatedTask: ITask, token: string) => {
  const response = await apiInstance.put(
    `/task/${updatedTask._id}`,
    updatedTask,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTaskService = async (id: number, token: string) => {
  await apiInstance.delete(`/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};
