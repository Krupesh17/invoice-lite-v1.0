import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceFields: {
    companyDetails: {
      logo: null,
      signature: null,
      name: "InvoiceLite Ltd",
      address: "1234 Main Street, Anytown, USA",
      metadata: [],
    },
    clientDetails: {
      name: "John Doe",
      address: "4567 Elm Street, Anytown, USA",
      metadata: [],
    },
    invoiceDetails: {
      currency: "USD",
      theme: {
        mode: "light",
        baseColor: "#FF6000",
      },
      invoicePrefix: "Invoice INV-",
      serialNumber: "0001",
      invoiceDate: new Date().toISOString(),
      invoiceDueDate: null,
      paymentTerms: "",
      billingDetails: [],
    },
    invoiceItems: [],
    metadata: {
      notes: "",
      terms: "",
      paymentInformation: [],
    },
  },
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateCompanyDetails: (state, action) => {
      state.invoiceFields.companyDetails = action.payload;
    },
    updateClientDetails: (state, action) => {
      state.invoiceFields.clientDetails = action.payload;
    },
    updateInvoiceDetails: (state, action) => {
      state.invoiceFields.invoiceDetails = action.payload;
    },
    updateInvoiceItems: (state, action) => {
      state.invoiceFields.invoiceItems = action.payload;
    },
    updateMetadata: (state, action) => {
      state.invoiceFields.metadata = action.payload;
    },
    updateInvoiceFields: (state, action) => {
      state.invoiceFields = action.payload;
    },
    resetInvoiceFields: (state) => {
      state.invoiceFields = initialState?.invoiceFields;
    },
  },
});

export const {
  updateCompanyDetails,
  updateClientDetails,
  updateInvoiceDetails,
  updateInvoiceItems,
  updateMetadata,
  updateInvoiceFields,
  resetInvoiceFields,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
