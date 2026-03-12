import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceFields: {
    companyDetails: {
      logo: null, // Base64 (IndexedDB) | URL (Supabase)
      signature: null, // Base64 (IndexedDB) | URL (Supabase)
      name: "InvoiceLite Ltd",
      address: "1234 Main Street, Anytown, USA",
      metadata: [], // Will Store Objects {label: "", value: ""}
    },
    clientDetails: {
      name: "John Doe",
      address: "4567 Elm Street, Anytown, USA",
      metadata: [], // Will Store Objects {label: "", value: ""}
    },
    invoiceDetails: {
      currency: "USD",
      theme: {
        mode: "light",
        baseColor: "#FF6000",
      },
      invoicePrefix: "Invoice INV-",
      serialNumber: "0001",
      invoiceDate: new Date().toISOString(), // Store as ISO String (Redux requires all state and actions to be serializable (plain JSON).)
      invoiceDueDate: null,
      paymentTerms: "", //
      billingDetails: [], // Will Store Objects {label: "", value: "", Type: "" (Fixed Or Percentage)}
    },
    invoiceItems: [], // Will Store Objects {id:"", name: "", description: "", quantity: 0, unitPrice: 0}
    metadata: {
      notes: "",
      terms: "",
      paymentInformation: [], // Will Store Objects {label: "", value: ""}
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
