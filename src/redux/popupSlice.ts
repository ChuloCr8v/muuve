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
  newTicketDrawerIsOpen: { isOpen: false, editTicket: false, ticketID: "" },
  resetPasswordModalIsOpen: false,
  ticketActionModalIsOpen: { isOpen: false, ticketID: "", action: "" },
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
      state.newTicketDrawerIsOpen.isOpen = true;
      state.newTicketDrawerIsOpen.editTicket = false;
      state.newTicketDrawerIsOpen.ticketID = "";
    },

    closeNewTicketDrawer: (state) => {
      state.newTicketDrawerIsOpen.isOpen = false;
      state.newRoleModalIsOpen.action = "";
      state.newTicketDrawerIsOpen.editTicket = false;
    },

    openEditTicketDrawer: (state, action) => {
      state.newTicketDrawerIsOpen.isOpen = true;
      state.newTicketDrawerIsOpen.editTicket = true;
      state.newTicketDrawerIsOpen.ticketID = action.payload;
    },

    openResetPasswordModal: (state) => {
      state.resetPasswordModalIsOpen = true;
    },
    closeResetPasswordModal: (state) => {
      state.resetPasswordModalIsOpen = false;
    },

    openTicketActionModal: (state, action) => {
      state.ticketActionModalIsOpen.isOpen = true;
      state.ticketActionModalIsOpen.ticketID = action.payload.ticketID;
      state.ticketActionModalIsOpen.action = action.payload.action;
    },

    closeTicketActionModal: (state) => {
      state.ticketActionModalIsOpen.isOpen = false;
      state.ticketActionModalIsOpen.ticketID = "";
      state.ticketActionModalIsOpen.action = "";
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
  openEditTicketDrawer,
  openResetPasswordModal,
  closeResetPasswordModal,
  openTicketActionModal,
  closeTicketActionModal,
} = popupSlice.actions;

export default popupSlice.reducer;
