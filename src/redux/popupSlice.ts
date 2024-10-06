import { createSlice } from "@reduxjs/toolkit";
import { popupState } from "../types";

const initialState: popupState = {
  currentPopup: {
    isOpen: false,
    data: { id: "", title: "" },
    currentProject: "",
    action: "",
  },
  projectDetailsDrawerIsOpen: {
    isOpen: false,
    data: null,
  },
  newRoleModalIsOpen: {
    isOpen: false,
    module: "",
    action: "",
    data: [],
  },
  deactivateServiceModalIsOpen: {
    isOpen: false,
    data: [],
  },
  newTicketDrawerIsOpen: false,
  resetPasswordModalIsOpen: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.currentPopup = {
        isOpen: action.payload.isOpen ?? true,
        data: action.payload.data,
        currentProject: action.payload.currentProject,
        action: action.payload.action,
      };
    },

    hidePopup: (state) => {
      state.currentPopup = { ...state.currentPopup, isOpen: false };
    },

    openProjectDetailsDrawer: (state, action) => {
      state.projectDetailsDrawerIsOpen.isOpen = action.payload.isOpen ?? true;
      state.projectDetailsDrawerIsOpen.data = action.payload;
    },

    closeProjectDetailsDrawer: (state) => {
      state.projectDetailsDrawerIsOpen.isOpen = false;
      state.projectDetailsDrawerIsOpen.data = null;
    },

    openNewRoleModal: (state, action) => {
      state.newRoleModalIsOpen.isOpen = true;
      state.newRoleModalIsOpen.module = action.payload.module;
      state.newRoleModalIsOpen.data = action.payload.data;
      state.newRoleModalIsOpen.action = action.payload.action;
    },

    closeNewRoleModal: (state) => {
      state.newRoleModalIsOpen.isOpen = false;
      state.newRoleModalIsOpen.module = "";
      state.newRoleModalIsOpen.data = [];
      state.newRoleModalIsOpen.action = "";
    },

    openDeactivateServiceModal: (state, action) => {
      state.deactivateServiceModalIsOpen.isOpen = true;
      state.deactivateServiceModalIsOpen.data = action.payload;
    },

    closeDeactivateServiceModal: (state) => {
      state.deactivateServiceModalIsOpen.isOpen = false;
      state.deactivateServiceModalIsOpen.data = [];
    },

    openNewTicketDrawer: (state) => {
      state.newTicketDrawerIsOpen = true;
    },

    closeNewTicketDrawer: (state) => {
      state.newTicketDrawerIsOpen = false;
    },

    openResetPasswordModal: (state) => {
      state.resetPasswordModalIsOpen = true;
    },
    closeResetPasswordModal: (state) => {
      state.resetPasswordModalIsOpen = false;
    },
  },
});

export const {
  showPopup,
  hidePopup,
  openProjectDetailsDrawer,
  closeProjectDetailsDrawer,
  openNewRoleModal,
  closeNewRoleModal,
  openDeactivateServiceModal,
  closeDeactivateServiceModal,
  openNewTicketDrawer,
  closeNewTicketDrawer,
  openResetPasswordModal,
  closeResetPasswordModal,
} = popupSlice.actions;

export default popupSlice.reducer;
