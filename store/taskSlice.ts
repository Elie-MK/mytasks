import { createSlice } from "@reduxjs/toolkit";

import { ITask } from "../interfaces/ITask";

const initialState: ITask[] = [];

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
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
