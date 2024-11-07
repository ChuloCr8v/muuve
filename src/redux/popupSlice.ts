import { createSlice } from "@reduxjs/toolkit";

export enum PopupState {
  ASSIGN_JOBORDER = "ASSIGN_JOBORDER",
  REASSIGN_JOBORDER = "REASSIGN_JOBORDER",
  REJECT_JOBORDER = "REJECT_JOBORDER",
  DELETE_JOBORDER = "DELETE_JOBORDER",
  SIGNOFF_JOBORDER = "SIGNOFF_JOBORDER",
  ACTIVATE_STAFF = "ACTIVATE_STAFF",
  DEACTIVATE_STAFF = "DEACTIVATE_STAFF",
  ACTIVATE_CUSTOMER = "ACTIVATE_CUSTOMER",
  DEACTIVATE_CUSTOMER = "DEACTIVATE_CUSTOMER",
  ACTIVATE_VENDOR = "ACTIVATE_VENDOR",
  DEACTIVATE_VENDOR = "DEACTIVATE_VENDOR",
  ADD_TICKET_CATEGORY = "ADD_TICKET_CATEGORY",
}

export enum DrawerState {
  NEW_JOBORDER_DRAWER = "NEW_JOBORDER_DRAWER",
  EDIT_JOBORDER_DRAWER = "EDIT_JOBORDER_DRAWER",
  JOBORDER_DETAILS_DRAWER = "JOBORDER_DETAILS_DRAWER",
  EDIT_STAFF_DRAWER = "EDIT_STAFF_DRAWER",
  EDIT_CUSTOMER_DRAWER = "EDIT_CUSTOMER_DRAWER",
  EDIT_VENDOR_DRAWER = "EDIT_VENDOR_DRAWER",
  NEW_TICKET_DRAWER = "NEW_TICKET_DRAWER",
}

const initialState = {
  currentPopup: {
    isOpen: "",
    id: "",
    currentProject: "",
    action: "",
    isEditingData: false,
  },

  currentDrawer: {
    isOpen: "",
    id: "",
    isEditingData: false,
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
    openDrawer: (state, action) => {
      const { isOpen, id, isEditingData } = action.payload;
      state.currentDrawer.isOpen = isOpen;
      state.currentDrawer.id = id ?? "";
      state.currentDrawer.isEditingData = isEditingData ?? false;
    },
    closeDrawer: (state) => {
      state.currentDrawer.isOpen = "";
      state.currentDrawer.id = "";
      state.currentDrawer.isEditingData = false;
    },

    openPopup: (state, action) => {
      const { isOpen, id, isEditingData } = action.payload;
      state.currentPopup.isOpen = isOpen;
      state.currentPopup.id = id;
      state.currentPopup.action = action.payload.action;
      state.currentPopup.isEditingData = isEditingData ?? false;
    },

    closePopup: (state) => {
      state.currentPopup.isOpen = "";
      state.currentPopup.id = "";
      state.currentPopup.isEditingData = false;
      state.currentPopup.action = "";
    },
  },
});

export const { openDrawer, closeDrawer, openPopup, closePopup } =
  popupSlice.actions;

export default popupSlice.reducer;
