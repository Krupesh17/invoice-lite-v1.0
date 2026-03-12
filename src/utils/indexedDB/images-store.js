import { v4 as uuidV4 } from "uuid";
import { validateData, validateId, withTransaction } from "./db";
import { getTimestamp } from "@/helpers/timestamp";

const IMAGES_STORE = "images";

export function saveImage(data) {
  validateData(data);

  return withTransaction(
    IMAGES_STORE,
    "readwrite",
    (store, resolve, reject) => {
      const image = {
        ...data, // this will contain {base64, type -> (logo | signature)}
        id: uuidV4(),
        createdAt: getTimestamp(),
      };

      const request = store.add(image);

      request.onsuccess = () => {
        resolve(image);
      };

      request.onerror = () => {
        reject(
          new Error(
            `Failed to save image: ${request.error?.message ?? "Unknown error"}`,
          ),
        );
      };
    },
  );
}

export function getImages() {
  return withTransaction(IMAGES_STORE, "readonly", (store, resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result ?? []);
    };

    request.onerror = () => {
      reject(
        new Error(
          `Failed to retrieve images: ${request.error?.message ?? "Unknown error"}`,
        ),
      );
    };
  });
}

export function getImageById(id) {
  validateId(id);

  return withTransaction(IMAGES_STORE, "readonly", (store, resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = () => {
      if (!request.result) {
        reject(new Error(`Image with id "${id}" not found.`));
        return;
      }

      resolve(request.result);
    };

    request.onerror = () =>
      reject(
        new Error(
          `Failed to retrieve image: ${request.error?.message ?? "Unknown error"}`,
        ),
      );
  });
}

export function deleteImage(id) {
  validateId(id);

  return withTransaction(
    IMAGES_STORE,
    "readwrite",
    (store, resolve, reject) => {
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existingImage = getRequest.result;

        if (!existingImage) {
          reject(new Error(`Image with id "${id}" not found.`));
          return;
        }

        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = () => {
          resolve({ deleted: true, id });
        };

        deleteRequest.onerror = () =>
          reject(
            new Error(
              `Failed to delete image: ${deleteRequest.error?.message ?? "Unknown error"}`,
            ),
          );
      };

      getRequest.onerror = () =>
        reject(
          new Error(
            `Failed to retrieve image: ${getRequest.error?.message ?? "Unknown error"}`,
          ),
        );
    },
  );
}
