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
import { pdf } from "@react-pdf/renderer";
import InvoicePdf from "./invoice-pdf";

function DownloadPopover() {
  const { pathname } = useLocation();
  const isEditPath = pathname.split("/")[1] === "edit";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(null);

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

  const generateBlob = async () => {
    return await pdf(<InvoicePdf invoice={invoiceFields} />).toBlob();
  };

  const handleViewPdf = async () => {
    setLoading("view");
    try {
      const blob = await generateBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } finally {
      setLoading(null);
    }
  };

  const handleDownloadPdf = async () => {
    setLoading("download");
    try {
      const blob = await generateBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoiceFields?.invoiceDetails?.invoicePrefix}${invoiceFields?.invoiceDetails?.serialNumber}`;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
    }
  };
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
        isLoading: loading === "view",
      },
      {
        id: "download-pdf",
        icon: FileDownIcon,
        label: "Download PDF",
        onClick: handleDownloadPdf,
        isLoading: loading === "download",
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

        {/* <PDFDownloadLink
          className="h-8 px-3 inline-flex items-center shrink-0 rounded-md text-xs font-medium hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          document={<InvoicePdf invoice={invoiceFields} />}
          fileName="document.pdf"
        >
          {({ loading }) =>
            loading ? (
              "Loading document..."
            ) : (
              <div className="inline-flex items-center justify-start gap-1.5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0">
                <FileDownIcon /> <span>Download PDF</span>
              </div>
            )
          }
        </PDFDownloadLink> */}
      </PopoverContent>
    </Popover>
  );
}

export default DownloadPopover;
