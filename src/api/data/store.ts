import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/es/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistCombineReducers,
} from "redux-persist";
import { api } from "../base";
import { auth } from "./auth";
import popupSlice from "../../redux/popupSlice";

const persistedReducer = persistCombineReducers(
  {
    key: "root",
    version: 1,
    storage,
    blacklist: [api.reducerPath],
  },
  {
    [auth.name]: auth.reducer,
    [api.reducerPath]: api.reducer,
    popups: popupSlice,
  }
);

const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (m) => m({ serializableCheck }).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
