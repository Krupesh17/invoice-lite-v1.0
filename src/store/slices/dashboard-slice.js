import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInvoiceItemToEdit: false,
  invoiceItemToEdit: {
    id: "",
    itemName: "",
    itemDescription: "",
    quantity: null,
    unitPrice: null,
  },
  errors: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateInvoiceItemToEdit: (state, action) => {
      state.invoiceItemToEdit = action.payload;
      state.isInvoiceItemToEdit = true;
    },
    resetInvoiceItemToEdit: (state) => {
      state.invoiceItemToEdit = {
        id: "",
        itemName: "",
        itemDescription: "",
        quantity: null,
        unitPrice: null,
      };
      state.isInvoiceItemToEdit = false;
    },
    setFormError(state, action) {
      const { formId, hasError } = action.payload;
      if (hasError) {
        state.errors[formId] = true;
      } else {
        delete state.errors[formId];
      }
    },
    clearAllFormErrors(state) {
      state.errors = {};
    },
  },
});

export const {
  updateInvoiceItemToEdit,
  resetInvoiceItemToEdit,
  setFormError,
  clearAllFormErrors,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;

// Base selector
const selectFormErrors = (state) => state.dashboard.errors;

// Memoized selectors
export const selectIsFormError = createSelector(
  selectFormErrors,
  (errors) => Object.keys(errors).length > 0,
);

export const selectFormErrorIds = createSelector(selectFormErrors, (errors) =>
  Object.keys(errors),
);
