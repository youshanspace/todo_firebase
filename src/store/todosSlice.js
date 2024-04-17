import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { logout } from './userSlice';

// To FireStore
export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  let todos = [];
  const q = query(collection(database, 'todos'), orderBy('createdTime'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });
  return todos;
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  try {
    const ref = await addDoc(collection(database, 'todos'), todo);
    const newTodo = { id: ref.id, ...todo };
    return newTodo;
  } catch (err) {
    console.log(err);
  }
});

export const editTodo = createAsyncThunk('todos/edit', async (editTodo) => {
  try {
    const ref = doc(database, 'todos', editTodo.id);
    await updateDoc(ref, editTodo);
    return editTodo;
  } catch (e) {
    console.error('Error editing todo: ', e);
  }
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id) => {
  try {
    await deleteDoc(doc(database, 'todos', id));
    return id;
  } catch (e) {
    console.error('Error deleting new todo: ', e);
  }
});

// Firestore snapshot to Store
export const addTodoToStore = createAsyncThunk(
  'todos/addTodoToStore',
  async (todo) => {
    const newTodo = { ...todo };
    return newTodo;
  }
);

export const updateTodoToStore = createAsyncThunk(
  'todos/updateTodoToStore',
  async (todo) => {
    const newTodo = { ...todo };
    return newTodo;
  }
);

export const removeTodoFromStore = createAsyncThunk(
  'todos/removeTodoFromStore',
  async (id) => {
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isLoading: false,
    firstFetch: false,
    data: [],
  },
  reducers: {
    resetState(state, action) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.firstFetch = true;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.firstFetch = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      // state.data.push(action.payload);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      // const newBook = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      // state.data = state.data.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(addTodoToStore.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(updateTodoToStore.fulfilled, (state, action) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }
        return todo;
      });
    });
    builder.addCase(removeTodoFromStore.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.firstFetch = false;
      state.data = [];
    });
    builder.addCase(logout.rejected, (state) => {
      state.firstFetch = false;
      state.data = [];
    });
  },
});

export const { resetState } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
