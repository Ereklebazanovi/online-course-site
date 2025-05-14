
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   uid: string | null;
//   email: string | null;
//   isEmailVerified: boolean;
// }

// const initialState: UserState = {
//   uid: null,
//   email: null,
//   isEmailVerified: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserState>) => {
//       state.uid = action.payload.uid;
//       state.email = action.payload.email;
//       state.isEmailVerified = action.payload.isEmailVerified;
//     },
//     clearUser: (state) => {
//       state.uid = null;
//       state.email = null;
//       state.isEmailVerified = false;
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;


// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

// Define the shape of user state
interface UserState {
  uid: string | null;
  email: string | null;
  isEmailVerified: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  uid: null,
  email: null,
  isEmailVerified: false,
  isAdmin: false,
  loading: false,
  error: null,
};

// Async thunk: login
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Check for admin status in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const isAdmin = userDoc.exists() ? userDoc.data().isAdmin === true : false;

      return {
        uid: user.uid,
        email: user.email,
        isEmailVerified: user.emailVerified,
        isAdmin,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk: logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        isEmailVerified: boolean;
        isAdmin: boolean;
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.isEmailVerified = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.isEmailVerified = action.payload.isEmailVerified;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.uid = null;
        state.email = null;
        state.isEmailVerified = false;
        state.isAdmin = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
