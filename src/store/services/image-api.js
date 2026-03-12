import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  deleteImage,
  getImages,
  saveImage,
} from "@/utils/indexedDB/images-store";
import { createError } from "./helpers/api-error-handler";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Unused but required by RTK Query
  tagTypes: ["Image"], // Tags allow us to "invalidate" the cache
  endpoints: (builder) => ({
    // FETCH ALL IMAGES
    fetchImages: builder.query({
      async queryFn(type) {
        try {
          const result = await getImages();
          const filteredResult = await result?.filter(
            (image) => image?.type === type,
          );
          return { data: filteredResult };
        } catch (error) {
          return createError(error, "fetching your images");
        }
      },
      providesTags: ["Image"], // This endpoint provides the 'Images' tag
    }),

    // UPLOAD/SAVE IMAGE
    uploadImage: builder.mutation({
      async queryFn(imageData) {
        try {
          const result = await saveImage(imageData);
          return { data: result };
        } catch (error) {
          return createError(error, "uploading the image");
        }
      },
      invalidatesTags: ["Image"], // This triggers a refetch of fetchImages
    }),

    // DELETE IMAGE
    removeImage: builder.mutation({
      async queryFn(id) {
        try {
          const result = await deleteImage(id);
          return { data: result };
        } catch (error) {
          return createError(error, "deleting the image from storage");
        }
      },
      invalidatesTags: ["Image"],
    }),
  }),
});

export const {
  useFetchImagesQuery,
  useUploadImageMutation,
  useRemoveImageMutation,
} = imageApi;
