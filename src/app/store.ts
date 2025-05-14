// src/app/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../courses/slices/authSlice";
import coursesReducer from "../courses/slices/coursesSlice"; // ✅ Import courses reducer

// Optional: separate persist config just for auth
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading", "error"], // Don't persist volatile state
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  courses: coursesReducer, // ✅ Add courses to root reducer
});

const persistedReducer = persistReducer(
  { key: "root", storage, blacklist: ["courses"] }, // Optional: exclude courses from root-level persist
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
