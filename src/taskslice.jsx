// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      state.tasks[action.payload.index] = action.payload.value;
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;

export default taskSlice.reducer;
