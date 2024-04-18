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
  setIsReloading,
} from './todosSlice';
import { userReducer, login, logout, setUser, setNextPath } from './userSlice';

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
  setNextPath,
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  syncAddTodo,
  syncUpdateTodo,
  syncDeleteTodo,
  resetTodos,
  setIsReloading,
};
