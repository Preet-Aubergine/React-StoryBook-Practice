import type { TaskData } from "../types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskBoxState {
  tasks: TaskData[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const defaultTasks: TaskData[] = [
  { id: "1", title: "Task 1", state: "TASK_INBOX" },
  { id: "2", title: "Task 2", state: "TASK_INBOX" },
  { id: "3", title: "Task 3", state: "TASK_INBOX" },
  { id: "4", title: "Task 4", state: "TASK_INBOX" },
];

const TaskBoxData: TaskBoxState = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (
      state,
      action: PayloadAction<{ id: String; newTaskState: TaskData["state"] }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.state = action.payload.newTaskState;
      }
    },
  },
});

export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
