import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface drawerState {
  projectFormIsOpen: boolean;
  currentProjectForm: string;
}

const initialState: drawerState = {
  currentProjectForm: "",
  projectFormIsOpen: false,
};

const drawerSlice = createSlice({
  name: "drawers",
  initialState,
  reducers: {
    openProjectForm: (state, action: PayloadAction<string>) => {
      state.currentProjectForm = action.payload;
      state.projectFormIsOpen = true;
    },
    closeProjectForm: (state) => {
      state.currentProjectForm = "";
      state.projectFormIsOpen = false;
    },
  },
});

export const { openProjectForm, closeProjectForm } = drawerSlice.actions;

export default drawerSlice.reducer;
