import { PackagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AddInvoiceItemForm from "./forms/add-invoice-item-form";

function AddInvoiceItemDialog({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-4! rounded-xl!">
        <DialogHeader className="flex-row! items-center text-left!">
          <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
            <PackagePlus className="size-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <DialogTitle className="text-sm">Add Item</DialogTitle>
            <DialogDescription className="text-xs">
              Add an item to the invoice
            </DialogDescription>
          </div>
        </DialogHeader>

        <AddInvoiceItemForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddInvoiceItemDialog;
