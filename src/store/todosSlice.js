import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {database} from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const q = query(collection(database, "todos"));
  const querySnapshot = await getDocs(q);
  const todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({id: doc.id, ...doc.data()})
  })
  return todos;
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  const ref = await addDoc(collection(database,'todos'), todo);
  const newTodo = { id: ref.id, ...todo };
  return newTodo;
})

export const editTodo = createAsyncThunk('todos/edit', async (editTodo) => {
  try {
    const ref = doc(database, "todos", editTodo.id);
    await updateDoc(ref, editTodo);
    return editTodo;
  } catch (e) {
    console.error("Error editing todo: ", e);
  }
})

export const deleteTodo = createAsyncThunk('todos/delete', async (id) => {
  try {
    await deleteDoc(doc(database, "todos", id));
    return id;
  } catch (e) {
    console.error("Error deleting new todo: ", e);
  }
})

const todosSlice = createSlice({
  name: 'Todos',
  initialState: {
    data: []
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      // state.data.push(action.payload);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      const newBook = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      // state.data = state.data.filter((todo) => todo.id !== action.payload);
    })
  }
})

export const todosReducer = todosSlice.reducer;