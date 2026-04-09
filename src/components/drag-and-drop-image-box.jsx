import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { ImagePlusIcon, LoaderIcon, SignatureIcon } from "lucide-react";
import { useUploadImageMutation } from "@/store/services/image-api";
import { compressImageToBase64 } from "@/helpers/image-compressor";

/**
 * IndexedDB (Local)
 * When 'Allow Data Sync' toggle switch is 'off' then the image should be stored in a 'IndexedDB'
 * Data Table called 'images'. This data table have 'Key' and 'Value' columns in a column 'Key'
 * I will store unique id for that particular image and in column 'Value' will i will store an object
 * containing following data -> id, createdAt, blob, type (logo | signature).
 *
 * SupabaseDB (Server)
 * When 'Allow Data Sync' toggle switch is 'on' then the image should be stored in a 'supabase'
 * bucket called 'images' and URL to that image should be stored inside the 'Data Table' called 'images'
 * in supabase. This 'images' data table will have following columns -> id, image_url, type (logo | signature).
 * Before uploading image to supabase bucket we will compress and convert that image to 'webp' and then store
 * it in supabase bucket.
 */

function DragAndDropImageBox({ type, storageType, iconVisible = false }) {
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const saveImageToIndexedDB = useCallback(
    async (file) => {
      try {
        const base64 = await compressImageToBase64(file, {
          maxWidth: 300,
          maxHeight: 300,
          quality: 0.7,
          format: "image/jpeg",
        });

        const data = { base64, type };
        await uploadImage(data).unwrap();
        toast.success(`Image Added Successfully`, {
          description: `Your ${type} has been added and saved successfully.`,
        });
      } catch (err) {
        toast.error("Error Saving Image", {
          description:
            err?.message ||
            "An unexpected error occurred while saving the image. Please try again.",
        });
      }
    },
    [type, uploadImage],
  );

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      try {
        if (acceptedFiles.length > 0) {
          storageType === "server"
            ? console.log("uploadImageToSupabase")
            : await saveImageToIndexedDB(acceptedFiles[0]);
        }

        if (fileRejections.length > 0) {
          const firstRejection = fileRejections[0];
          const firstError = firstRejection.errors[0];

          if (firstError.code === "too-many-files") {
            throw new Error("Please select only one file.");
          } else if (firstError.code === "file-too-large") {
            throw new Error("File size must be 400KB or less.");
          } else if (firstError.code === "file-invalid-type") {
            throw new Error("Only JPEG, JPG, and PNG files are accepted.");
          } else {
            throw new Error(firstError.message);
          }
        }
      } catch (err) {
        toast.error("Error Uploading Image", {
          description:
            err?.message ||
            "An unexpected error occurred while uploading the image. Please try again.",
        });
      }
    },
    [saveImageToIndexedDB],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxSize: 400 * 1024, // 400kb in bytes
  });

  return isLoading ? (
    <div className="aspect-square flex items-center bg-background border border-input border-dashed rounded-lg outline-none">
      <div className="flex flex-col items-center gap-2 mx-auto">
        <LoaderIcon className="size-5 animate-spin shrink-0 text-foreground" />
        <p className="font-medium text-[10px] sm:text-xs text-foreground">
          Uploading a File
        </p>
      </div>
    </div>
  ) : (
    <div
      {...getRootProps()}
      className="aspect-square bg-background border border-input border-dashed rounded-lg hover:bg-sidebar overflow-hidden outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="p-2 lg:p-4 w-full h-full flex flex-col items-center justify-center gap-2 text-center">
        {iconVisible &&
          (type === "logo" ? (
            <ImagePlusIcon className="size-5 lg:size-6 text-primary shrink-0" />
          ) : (
            <SignatureIcon className="size-5 lg:size-6 text-primary shrink-0" />
          ))}

        <h5 className="font-medium text-xs">Drag & Drop or Click to Upload</h5>
        <p className="text-[10px] text-muted-foreground">
          Max size: 400Kb (PNG, JPG)
        </p>
      </div>
    </div>
  );
}

export default DragAndDropImageBox;
