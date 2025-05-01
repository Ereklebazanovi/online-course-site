
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  isEmailVerified: boolean;
}

const initialState: UserState = {
  uid: null,
  email: null,
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isEmailVerified = action.payload.isEmailVerified;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.isEmailVerified = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;