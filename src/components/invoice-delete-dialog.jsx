import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRemoveInvoiceMutation } from "@/store/services/invoice-api";
import { toast } from "sonner";

function InvoiceDeleteDialog({ open, setOpen, invoice }) {
  const [dialogBlock, setDialogBlock] = useState(false);

  const [removeInvoice, { isLoading }] = useRemoveInvoiceMutation();

  const { id } = invoice;

  const deleteInvoice = useCallback(async () => {
    try {
      setDialogBlock(true);
      await removeInvoice(id);
      toast.success("Invoice Deleted Successfully.", {
        description: "Your invoice has been deleted successfully.",
      });
      setOpen(false);
    } catch (err) {
      toast.error("Error Deleting Invoice", {
        description:
          err?.message ||
          "An unexpected error occurred while deleting the invoice. Please try again.",
      });
    } finally {
      setDialogBlock(false);
    }
  }, [id, removeInvoice]);

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
            <Trash2Icon className="size-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <DialogTitle className="text-sm">Delete Invoice</DialogTitle>
            <DialogDescription className="text-xs">
              This action cannot be undone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="bg-sidebar p-3 space-y-1 rounded-lg">
          <h4 className="text-sm text-destructive font-medium">
            Proceed with caution!
          </h4>
          <p className="text-xs text-muted-foreground">
            This action cannot be undone. It will remove the invoice permanently
            from the database. You will not be able to recover it.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice-id-input" className="text-xs max-w-fit">
            Invoice ID
          </Label>
          <Input type="text" className="h-8" value={id} disabled={true} />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleOnOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={deleteInvoice}
          >
            {isLoading && <LoaderIcon className="animate-spin" />}
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InvoiceDeleteDialog;
