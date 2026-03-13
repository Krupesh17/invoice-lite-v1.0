import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  updateInvoice,
} from "@/utils/indexedDB/invoices-store";
import { createError } from "./helpers/api-error-handler";
import { sortBy } from "@/helpers/data-sort";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Unused but required by RTK Query
  tagTypes: ["Invoice"], // Tags allow us to "invalidate" the cache
  endpoints: (builder) => ({
    // FETCH ALL INVOICE
    /**
     * Here we will first load locally stored invoices in 'IndexedDB' then if user is logged
     * in only then we will fetch and load invoices from server. Then we will combine received
     * result and combine them in on single array then short that array based on 'createdAt'
     * property's value after that we will send that filtered array as a response.
     */
    fetchInvoices: builder.query({
      async queryFn() {
        try {
          const result = await getInvoices();
          const sortedDataDesc = sortBy(result, "createdAt", "desc", "date");
          return { data: sortedDataDesc };
        } catch (error) {
          return createError(error, "fetching your invoices");
        }
      },
      providesTags: ["Invoice"], // This endpoint provides the 'Images' tag
    }),

    // SAVE INVOICE
    /**
     * Add logic where if 'Allow Data Sync' toggle is turned on then invoice should be saved
     * on server storage rather then local storage.
     */
    saveInvoice: builder.mutation({
      async queryFn(data) {
        try {
          const result = await createInvoice(data);
          return { data: result };
        } catch (error) {
          return createError(error, "saving your invoice");
        }
      },
      invalidatesTags: ["Invoice"], // This triggers a refetch of fetchInvoice
    }),

    // DELETE INVOICE
    /**
     * Here we will add `parameter` called 'type' which will have value as either (local | server)
     * based on 'type' we will call the function for deleting invoice. e.g. if 'type === "server"' then
     * we will call function which will delete invoice from server. and if 'type === "local"' then we
     * will call function which will delete invoice from local storage.
     * the queryFn will accept an object like following: {id, type}.
     */
    removeInvoice: builder.mutation({
      async queryFn(id) {
        try {
          const result = await deleteInvoice(id);
          return { data: result };
        } catch (error) {
          return createError(error, "deleting the invoice");
        }
      },
      invalidatesTags: ["Invoice"],
    }),

    // UPDATE INVOICE STATUS
    /**
     * Here while updating invoice status we need to send  data like following example:
     * {...existingData, status: "success"}
     * Here 'existingData' will have data of invoice then 'status' value can be one of the
     * following `pending | success | error | expired | refunded`.
     * There will be one more property we have to send to the 'updateInvoice()' function
     * which is 'paidAt' which will hold timestamp returned by 'getTimestamp()' helper function
     * the 'paidAt' property only added when "status" have value as 'success'.
     */
    editInvoice: builder.mutation({
      async queryFn(data) {
        try {
          const result = await updateInvoice(data);
          return { data: result };
        } catch (error) {
          return createError(error, "updating the invoice");
        }
      },
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useFetchInvoicesQuery,
  useSaveInvoiceMutation,
  useRemoveInvoiceMutation,
  useEditInvoiceMutation,
} = invoiceApi;
