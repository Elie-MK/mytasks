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
      state.splice(0, state.length, ...tasks);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, addTasks, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
