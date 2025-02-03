import { createSlice } from "@reduxjs/toolkit";

export interface ThemeInterface {
  darkMode: boolean;
}

const initialState: ThemeInterface = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setDarkMode: (state: ThemeInterface) => {
      state.darkMode = true;
    },
    setLightMode: (state: ThemeInterface) => {
      state.darkMode = false;
    },
  },
});

export const { setDarkMode, setLightMode } = themeSlice.actions;

export default themeSlice.reducer;
