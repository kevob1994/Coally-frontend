import { ITask, TCreateTaskType } from "@interfaces";
import { RootState } from "@redux/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createTaskService,
  deleteTaskService,
  GetTasksService,
  updateTaskService,
} from "@services";

interface ITaskState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  filterByStatus: string;
}

const initialState: ITaskState = {
  tasks: [],
  loading: false,
  error: null,
  filterByStatus: "all",
};

const getAuthToken = (getState: () => RootState) => getState().auth.token;

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (queryParams: Record<string, string | number>, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await GetTasksService(token || "", queryParams);
    return response;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask: TCreateTaskType, { getState, dispatch }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await createTaskService(newTask, token || "");
    const { filterByStatus } = (getState as () => RootState)().task;

    dispatch(
      fetchTasks(
        filterByStatus !== "all"
          ? {
              completed: filterByStatus,
            }
          : {}
      )
    );
    return response;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: ITask, { getState, dispatch }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await updateTaskService(updatedTask, token || "");
    const { filterByStatus } = (getState as () => RootState)().task;

    dispatch(
      fetchTasks(
        filterByStatus !== "all"
          ? {
              completed: filterByStatus,
            }
          : {}
      )
    );
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await deleteTaskService(id, token || "");
    return response;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilterByStatus(state, action: PayloadAction<string>) {
      state.filterByStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error getting tasks";
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creating task";
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error updating task";
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error deleting task";
      });
  },
});
export const { setFilterByStatus } = taskSlice.actions;
export default taskSlice.reducer;
