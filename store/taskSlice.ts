import { createSlice } from "@reduxjs/toolkit";

import { TaskResponse } from "../api/types/models";

const initialState: TaskResponse[] = [];

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const existingTask = state.find((task) => task.id === action.payload.id);
      if (!existingTask) {
        state.push(action.payload);
      }
    },
    addTasks: (state, action) => {
      const tasks = action.payload;
      tasks.forEach((task: TaskResponse) => {
        const existingTask = state.find((existing) => existing.id === task.id);
        if (!existingTask) {
          state.push(task);
        }
      });
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, addTasks, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
