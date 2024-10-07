import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import { AuthState } from "../types";

const emptyAuth: AuthState = {
  token: "",
};

function initialState(): AuthState {
  const saved = localStorage.getItem("auth");
  return saved ? JSON.parse(saved) : emptyAuth;
}

export const auth = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    setAuth: (_, { payload }: PayloadAction<AuthState>) => payload,
    clearAuth: () => emptyAuth,
  },
});

export const { setAuth, clearAuth } = auth.actions;

export function useAuthState() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return useMemo(() => {
    const isLoggedIn = !!auth.token;
    const clear = () => dispatch(clearAuth());
    const set = (auth: AuthState) => dispatch(setAuth(auth));
    return { ...auth, isLoggedIn, clear, set };
  }, [auth, dispatch]);
}

// export const selectCurrentAuthUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
