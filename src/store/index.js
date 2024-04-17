import { configureStore } from '@reduxjs/toolkit';
import {
  todosReducer,
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  addTodoToStore,
  updateTodoToStore,
  removeTodoFromStore,
  resetState,
} from './todosSlice';
import { userReducer, login, logout, setLogin } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

export {
  login,
  logout,
  setLogin,
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  addTodoToStore,
  updateTodoToStore,
  removeTodoFromStore,
  resetState,
};
