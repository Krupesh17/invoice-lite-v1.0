const DB_NAME = "invoice_lite";
const DB_VERSION = 1;
const INVOICES_STORE = "invoices";
const IMAGES_STORE = "images";

export function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(INVOICES_STORE)) {
        db.createObjectStore(INVOICES_STORE, {
          keyPath: "id",
          autoIncrement: false,
        });
      }
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE, {
          keyPath: "id",
          autoIncrement: false,
        });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);

    request.onerror = (event) => {
      reject(
        new Error(
          `Failed to open database: ${event.target.error?.message ?? "Unknown error"}`,
        ),
      );
    };
  });
}

export async function withTransaction(storename, mode, callback) {
  let db;
  try {
    db = await connectToDatabase();
  } catch (err) {
    throw new Error(`Database connection failed: ${err.message}`);
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storename, mode);
    const store = transaction.objectStore(storename);

    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      reject(
        new Error(
          `Transaction failed: ${transaction.error?.message ?? "Unknown error"}`,
        ),
      );
    };
    transaction.onabort = () => {
      reject(
        new Error(
          `Transaction aborted: ${transaction.error?.message ?? "Unknown reason"}`,
        ),
      );
    };

    try {
      callback(store, resolve, reject);
    } catch (err) {
      reject(new Error(`Unexpected error during transaction: ${err.message}`));
    }
  });
}

export function validateData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid data: expected a non-null object.");
  }
}

export function validateId(id) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid id: expected a non-empty string.");
  }
}
