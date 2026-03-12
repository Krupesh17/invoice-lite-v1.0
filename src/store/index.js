import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slices/invoice-slice";
import dashboardReducer from "./slices/dashboard-slice";
import { imageApi } from "./services/image-api";
import { invoiceApi } from "./services/invoice-api";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    dashboard: dashboardReducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(imageApi.middleware, invoiceApi.middleware),
});

export default store;
