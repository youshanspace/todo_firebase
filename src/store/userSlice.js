import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

export const login = createAsyncThunk('user/login', async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return {
    uid: user.uid,
    name: user.displayName,
    imgURL: user.photoURL,
    email: user.email,
  };
});

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});

export const setUser = createAsyncThunk('user/setUser', async (user) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return { ...user };
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nextPath: '',
    isLogin: false,
    data: {
      uid: null,
      name: null,
      imgURL: null,
      email: null,
    },
  },
  reducers: {
    setNextPath(state, action) {
      state.nextPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.data = { ...action.payload };
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.data = {
        uid: null,
        name: null,
        imgURL: null,
        email: null,
      };
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.data = { ...action.payload };
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.isLogin = true;
      state.data = { ...action.payload };
    });
  },
});

export const { setNextPath } = userSlice.actions;
export const userReducer = userSlice.reducer;
