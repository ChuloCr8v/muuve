import { createSlice } from "@reduxjs/toolkit";

export interface ThemeInterface {
  isOpen: boolean;
}

const initialState: ThemeInterface = {
  isOpen: false,
};

const navSlice = createSlice({
  name: "navSlice",
  initialState,
  reducers: {
    toggleNav: (state: ThemeInterface) => {
      if (state.isOpen) {
        state.isOpen = false;
      } else state.isOpen = true;
    },
  },
});

export const { toggleNav } = navSlice.actions;

export default navSlice.reducer;
