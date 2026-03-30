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
  invoicesTableFilters: {
    storage: [],
    id: "",
    createdAt: { from: undefined, to: undefined },
    paidAt: { from: undefined, to: undefined },
    serialNo: "",
    status: [],
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
    updateInvoicesTableFilters: (state, action) => {
      state.invoicesTableFilters = action.payload;
    },
    resetInvoicesTableFilters: (state) => {
      state.invoicesTableFilters = {
        storage: [],
        id: "",
        createdAt: { from: undefined, to: undefined },
        paidAt: { from: undefined, to: undefined },
        serialNo: "",
        status: [],
      };
    },
    clearInvoicesTableFilter: (state, action) => {
      const type = action.payload;
      const defaults = {
        storage: [],
        status: [],
        id: "",
        serialNo: "",
        createdAt: { from: undefined, to: undefined },
        paidAt: { from: undefined, to: undefined },
      };
      if (type in defaults) {
        state.invoicesTableFilters[type] = defaults[type];
      }
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
  updateInvoicesTableFilters,
  resetInvoicesTableFilters,
  clearInvoicesTableFilter,
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

export const selectInvoicesTableFilters = (state) =>
  state.dashboard.invoicesTableFilters;

export const selectHasActiveInvoiceFilters = createSelector(
  selectInvoicesTableFilters,
  (filter) =>
    filter.storage?.length > 0 ||
    filter.status?.length > 0 ||
    !!filter.id?.trim() ||
    !!filter.serialNo?.trim() ||
    !!filter.createdAt?.from ||
    !!filter.createdAt?.to ||
    !!filter.paidAt?.from ||
    !!filter.paidAt?.to,
);
