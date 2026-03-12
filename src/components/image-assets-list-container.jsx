import { useCallback } from "react";
import { useFetchImagesQuery } from "@/store/services/image-api";
import ImageAssetsPreviewBox from "./image-assets-preview-box";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyDetails } from "@/store/slices/invoice-slice";

function ImageAssetsListContainer({
  type,
  setDrawerOpen,
  deleteActive = false,
}) {
  const dispatch = useDispatch();
  const companyDetails = useSelector(
    (state) => state?.invoice?.invoiceFields?.companyDetails,
  );
  const { data: images } = useFetchImagesQuery(type);

  const handleSelect = useCallback(
    (image) => {
      if (deleteActive) return;
      dispatch(
        updateCompanyDetails({ ...companyDetails, [type]: image?.base64 }),
      );
      setDrawerOpen(false);
    },
    [deleteActive, dispatch, companyDetails, type, setDrawerOpen],
  );

  const handleKeyDown = useCallback(
    (event, image) => {
      if (!deleteActive && (event.key === "Enter" || event.key === " ")) {
        handleSelect(image);
      }
    },
    [deleteActive, handleSelect],
  );

  if (!images?.length) return null;

  return (
    <>
      {images?.map((image) => (
        <ImageAssetsPreviewBox
          key={image?.id}
          image={image}
          type={type}
          deleteActive={deleteActive}
          onClick={() => handleSelect(image)}
          onKeyDown={(event) => handleKeyDown(event, image)}
        />
      ))}
    </>
  );
}

export default ImageAssetsListContainer;
