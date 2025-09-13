// src/features/tasks/tasksSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initial state: where tasks live
const initialState = {
  items: [],
  filter: "all", // 👈 new: all | active | completed
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
        };
      },
    },
    toggleTask(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    updateTask(state, action) {
      const { id, text } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.text = text;
      }
    },
    reorderTasks(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, movedTask);
    },
  },
});

// Export actions for components to dispatch
export const { addTask, toggleTask, deleteTask, updateTask, reorderTasks } =
  tasksSlice.actions;

// Export reducer for store.js
export default tasksSlice.reducer;
