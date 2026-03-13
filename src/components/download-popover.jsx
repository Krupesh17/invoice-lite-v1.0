import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  DownloadIcon,
  FileDownIcon,
  LoaderIcon,
  SaveIcon,
  ScanEyeIcon,
} from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import {
  useEditInvoiceMutation,
  useSaveInvoiceMutation,
} from "@/store/services/invoice-api";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  selectFormErrorIds,
  selectIsFormError,
} from "@/store/slices/dashboard-slice";
import { useLocation } from "react-router-dom";

function DownloadPopover() {
  const { pathname } = useLocation();
  const isEditPath = pathname.split("/")[1] === "edit";

  const [open, setOpen] = useState(false);

  const isFormError = useSelector(selectIsFormError);
  const errorFormIds = useSelector(selectFormErrorIds);
  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);

  const [saveInvoice, { isLoading: isInvoiceSaving }] =
    useSaveInvoiceMutation();
  const [editInvoice, { isLoading: isInvoiceUpdating }] =
    useEditInvoiceMutation();

  const createInvoice = useCallback(async () => {
    if (isFormError) {
      toast.error("Please fix form errors before saving.", {
        description:
          "Some fields have invalid data. Review your forms and try again.",
      });
      console.warn("Blocked save — errors in forms:", errorFormIds);
      return;
    }

    try {
      isEditPath
        ? await editInvoice(invoiceFields)
        : await saveInvoice(invoiceFields);

      toast.success("Invoice Saved Successfully.", {
        description: "Your invoice has been Saved successfully.",
      });
      setOpen(false);
    } catch (err) {
      toast.error("Error Creating Invoice", {
        description:
          err?.message ||
          "An unexpected error occurred while creating the invoice. Please try again.",
      });
    }
  }, [isFormError, errorFormIds, invoiceFields, saveInvoice]);

  const handleViewPdf = useCallback(() => {
    console.log("View PDF");
  }, []);

  const handleDownloadPdf = useCallback(() => {
    console.log("Download PDF");
  }, []);

  const popoverOptions = useMemo(
    () => [
      {
        id: "save-invoice",
        icon: SaveIcon,
        label: "Save Invoice",
        onClick: createInvoice,
        isLoading: isEditPath ? isInvoiceUpdating : isInvoiceSaving,
      },
      {
        id: "view-pdf",
        icon: ScanEyeIcon,
        label: "View PDF",
        onClick: handleViewPdf,
      },
      {
        id: "download-pdf",
        icon: FileDownIcon,
        label: "Download PDF",
        onClick: handleDownloadPdf,
      },
    ],
    [
      createInvoice,
      handleViewPdf,
      handleDownloadPdf,
      isInvoiceSaving,
      isInvoiceUpdating,
    ],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" size="sm" className="max-sm:size-8! max-sm:p-0!">
          <DownloadIcon />
          <span className="max-sm:hidden">Download</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit flex flex-col gap-1 p-1.5">
        {popoverOptions.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className="justify-start text-xs"
            onClick={item.onClick}
            disabled={item.isLoading}
          >
            {item.isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <item.icon />
            )}
            {item.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default DownloadPopover;
