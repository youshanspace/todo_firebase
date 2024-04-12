import {configureStore} from "@reduxjs/toolkit";
import {todosReducer, fetchTodos, addTodo, editTodo, deleteTodo, addTodoToStore, updateTodoToStore, removeTodoFromStore} from "./todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})

export {fetchTodos, addTodo, editTodo, deleteTodo, addTodoToStore, updateTodoToStore, removeTodoFromStore};