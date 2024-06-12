import { configureStore } from '@reduxjs/toolkit';
import {
  todosReducer,
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  syncAddTodo,
  syncUpdateTodo,
  syncDeleteTodo,
  resetTodos,
} from './todosSlice';
import { userReducer, login, logout, setUser } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

export {
  login,
  logout,
  setUser,
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  syncAddTodo,
  syncUpdateTodo,
  syncDeleteTodo,
  resetTodos,
};
