import { useState } from "react";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import UpdateInvoiceStatusForm from "./forms/update-invoice-status-form";

function InvoiceStatusDialog({ open, setOpen, invoice }) {
  const [dialogBlock, setDialogBlock] = useState(false);

  const handleOnOpenChange = (value) => {
    if (!dialogBlock) {
      setOpen(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-lg p-4! rounded-xl!">
        <DialogHeader className="flex-row! items-center text-left!">
          <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
            <ChartNoAxesColumnIncreasingIcon className="size-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <DialogTitle className="text-sm">Update Invoice Status</DialogTitle>
            <DialogDescription className="text-xs">
              Update the status of the invoice to the new status.
            </DialogDescription>
          </div>
        </DialogHeader>

        <UpdateInvoiceStatusForm
          setOpen={handleOnOpenChange}
          setDialogBlock={setDialogBlock}
          invoice={invoice}
        />
      </DialogContent>
    </Dialog>
  );
}

export default InvoiceStatusDialog;
