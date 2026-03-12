import { useCallback } from "react";
import { useRemoveImageMutation } from "@/store/services/image-api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LoaderIcon, Trash2Icon } from "lucide-react";

function ImageAssetsPreviewBox({
  image,
  type = "image",
  deleteActive,
  ...props
}) {
  const [removeImage, { isLoading }] = useRemoveImageMutation();

  const handleDeleteImage = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!image?.id) {
        toast.error("Invalid or Missing ID", {
          description:
            "This request could not be processed due to a missing or invalid item ID.",
        });
        return; 
      }

      try {
        await removeImage(image.id).unwrap();
        toast.success("Image Deleted Successfully.", {
          description: `Your ${type} has been deleted successfully.`,
        });
      } catch (err) {
        toast.error("Error Deleting Image", {
          description:
            err?.data?.message ??
            "An unexpected error occurred while deleting the image. Please try again.",
        });
        console.error(err);
      }
    },
    [image?.id, removeImage, type],
  );

  if (!image?.base64) return null;

  return (
    <div
      tabIndex={deleteActive ? -1 : 0}
      className={`relative aspect-square bg-checkerboard border border-input/80 rounded-lg overflow-hidden outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] ${!deleteActive && "cursor-pointer hover:brightness-90 dark:hover:brightness-80"} `}
      {...props}
    >
      {deleteActive && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="absolute top-1 right-1 cursor-pointer text-destructive hover:text-destructive! hover:bg-destructive/20!"
          onClick={handleDeleteImage}
        >
          {isLoading ? <LoaderIcon /> : <Trash2Icon />}
        </Button>
      )}
      <img
        src={image?.base64}
        alt={`${type}-preview`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default ImageAssetsPreviewBox;
