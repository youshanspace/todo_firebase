import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { logout } from './userSlice';

// To FireStore
export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  let todos = [];
  const q = query(collection(database, 'todos'), orderBy('createdTime'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return todos;
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  try {
    const ref = await addDoc(collection(database, 'todos'), todo);
    const newTodo = { id: ref.id, ...todo };
    return newTodo;
  } catch (e) {
    console.error('Error adding todo: ', e);
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
export const syncAddTodo = createAsyncThunk('todos/syncAdd', async (todo) => {
  const newTodo = { ...todo };
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  return newTodo;
});

export const syncUpdateTodo = createAsyncThunk('todos/syncUpdate', async (todo) => {
  const newTodo = { ...todo };
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  return newTodo;
});

export const syncDeleteTodo = createAsyncThunk('todos/syncDelete', async (id) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isLoading: false,
    isSyncing: false,
    isReloading: true,
    firstFetch: false,
    data: [],
  },
  reducers: {
    resetTodos(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.firstFetch = true;
      state.data = action.payload;
      state.isReloading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.firstFetch = true;
      state.isReloading = false;
    });
    builder.addCase(addTodo.fulfilled, () => {});
    builder.addCase(editTodo.fulfilled, () => {});
    builder.addCase(deleteTodo.fulfilled, () => {});
    builder.addCase(syncAddTodo.pending, (state, action) => {
      state.isSyncing = true;
    });
    builder.addCase(syncAddTodo.fulfilled, (state, action) => {
      const found = state.data.some((todo) => todo.id === action.payload.id);
      if (!found) {
        state.data.push(action.payload);
      }
      state.isSyncing = false;
    });
    builder.addCase(syncAddTodo.rejected, (state, action) => {
      const found = state.data.some((todo) => todo.id === action.payload.id);
      if (!found) {
        state.data.push(action.payload);
      }
      state.isSyncing = false;
    });
    builder.addCase(syncUpdateTodo.pending, (state, action) => {
      state.isSyncing = true;
    });
    builder.addCase(syncUpdateTodo.fulfilled, (state, action) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }
        return todo;
      });
      state.isSyncing = false;
    });
    builder.addCase(syncUpdateTodo.rejected, (state, action) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }
        return todo;
      });
      state.isSyncing = false;
    });
    builder.addCase(syncDeleteTodo.pending, (state, action) => {
      state.isSyncing = true;
    });
    builder.addCase(syncDeleteTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
      state.isSyncing = false;
    });
    builder.addCase(syncDeleteTodo.rejected, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
      state.isSyncing = false;
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

export const { resetTodos } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
