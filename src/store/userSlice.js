import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

export const login = createAsyncThunk('user/login', async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  if (user) {
    return {
      uid: user.uid,
      name: user.displayName,
      imgURL: user.photoURL,
      email: user.email,
    };
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      uid: null,
      name: null,
      imgURL: null,
      email: null,
    },
  },
  reducers: {
    setLogin(state, action) {
      state.data = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = { ...action.payload };
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.data = {
        uid: null,
        name: null,
        imgURL: null,
        email: null,
      };
    });
  },
});

export const { setLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
