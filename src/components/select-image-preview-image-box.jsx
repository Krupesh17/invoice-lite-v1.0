import { memo, useCallback, useMemo } from "react";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyDetails } from "@/store/slices/invoice-slice";

function SelectImagePreviewImageBox({ label, icon, type, ...props }) {
  const dispatch = useDispatch();
  const companyDetails = useSelector(
    (state) => state?.invoice?.invoiceFields?.companyDetails,
  );

  const imageValue = companyDetails?.[type];

  const removeImageFromInvoice = useCallback(() => {
    dispatch(
      updateCompanyDetails({
        ...companyDetails,
        [type]: null,
      }),
    );
  }, [dispatch, companyDetails, type]);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium inline-block" htmlFor={type}>
        {label}
      </label>
      {imageValue ? (
        <div className="relative w-full aspect-square bg-checkerboard  border rounded-lg overflow-hidden">
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            className="absolute top-1 right-1 cursor-pointer"
            onClick={removeImageFromInvoice}
          >
            <XIcon />
          </Button>
          <img
            src={imageValue}
            alt={`image-preview`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <button
          type="button"
          id={type}
          className="w-full aspect-square border border-dashed rounded-lg flex items-center justify-center p-2 hover:bg-accent/80 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          {...props}
        >
          <div className="flex flex-col items-center gap-2">
            {icon}
            <p className="text-xs font-medium">Select Image From Assets</p>
            <small className="text-[10px] text-muted-foreground space-x-0.5">
              <span>Type:</span>
              <span>{type}</span>
            </small>
          </div>
        </button>
      )}
    </div>
  );
}

export default memo(SelectImagePreviewImageBox);
