import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
