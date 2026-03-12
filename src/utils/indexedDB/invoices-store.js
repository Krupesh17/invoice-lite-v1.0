import { v4 as uuidV4 } from "uuid";
import { validateData, validateId, withTransaction } from "./db";
import { getTimestamp } from "@/helpers/timestamp";

const INVOICES_STORE = "invoices";

export function createInvoice(data) {
  validateData(data);

  return withTransaction(
    INVOICES_STORE,
    "readwrite",
    (store, resolve, reject) => {
      const invoice = {
        ...data,
        id: uuidV4(),
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
        paidAt: null,
        status: "pending",
        type: "local",
      };

      const request = store.add(invoice);

      request.onsuccess = () => {
        console.log("Invoice created successfully.");
        resolve(invoice);
      };

      request.onerror = () => {
        reject(
          new Error(
            `Failed to create invoice: ${request.error?.message ?? "Unknown error"}`,
          ),
        );
      };
    },
  );
}

export function getInvoices() {
  return withTransaction(
    INVOICES_STORE,
    "readonly",
    (store, resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        console.log("Invoices retrieved successfully.");
        resolve(request.result ?? []);
      };

      request.onerror = () => {
        reject(
          new Error(
            `Failed to retrieve invoices: ${request.error?.message ?? "Unknown error"}`,
          ),
        );
      };
    },
  );
}

export function getInvoiceById(id) {
  validateId(id);

  return withTransaction(
    INVOICES_STORE,
    "readonly",
    (store, resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => {
        if (!request.result) {
          reject(new Error(`Invoice with id "${id}" not found.`));
          return;
        }
        console.log("Invoice retrieved successfully.");
        resolve(request.result);
      };

      request.onerror = () =>
        reject(
          new Error(
            `Failed to retrieve invoice: ${request.error?.message ?? "Unknown error"}`,
          ),
        );
    },
  );
}

export function updateInvoice(data) {
  validateData(data);
  validateId(data.id);

  return withTransaction(
    INVOICES_STORE,
    "readwrite",
    (store, resolve, reject) => {
      const getRequest = store.get(data.id);

      getRequest.onsuccess = () => {
        const existingInvoice = getRequest.result;

        if (!existingInvoice) {
          reject(new Error(`Invoice with id "${data.id}" not found.`));
          return;
        }

        const updatedInvoice = {
          ...existingInvoice,
          ...data,
          updatedAt: getTimestamp(),
        };
        const putRequest = store.put(updatedInvoice);

        putRequest.onsuccess = () => {
          console.log("Invoice updated successfully.");
          resolve(updatedInvoice);
        };

        putRequest.onerror = () =>
          reject(
            new Error(
              `Failed to update invoice: ${putRequest.error?.message ?? "Unknown error"}`,
            ),
          );
      };

      getRequest.onerror = () =>
        reject(
          new Error(
            `Failed to retrieve invoice: ${getRequest.error?.message ?? "Unknown error"}`,
          ),
        );
    },
  );
}

export function deleteInvoice(id) {
  validateId(id);

  return withTransaction(
    INVOICES_STORE,
    "readwrite",
    (store, resolve, reject) => {
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existingInvoice = getRequest.result;

        if (!existingInvoice) {
          reject(new Error(`Invoice with id "${id}" not found.`));
          return;
        }

        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = () => {
          console.log("Invoice deleted successfully.");
          resolve({ deleted: true, id });
        };

        deleteRequest.onerror = () =>
          reject(
            new Error(
              `Failed to delete invoice: ${deleteRequest.error?.message ?? "Unknown error"}`,
            ),
          );
      };

      getRequest.onerror = () =>
        reject(
          new Error(
            `Failed to retrieve invoice: ${getRequest.error?.message ?? "Unknown error"}`,
          ),
        );
    },
  );
}
