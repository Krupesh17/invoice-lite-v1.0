import { useState } from "react";
import { PackagePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import AddInvoiceItemDialog from "./add-invoice-item-dialog";

function InvoiceItemsAccordionItemContent() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddInvoiceItemDialog open={isDialogOpen} setOpen={setDialogOpen} />

      <div className="w-full space-y-4">
        <div className="space-y-1 text-xs">
          <h6 className="text-foreground font-medium">No Items Yet</h6>
          <p className="text-muted-foreground">
            No items have been added to this invoice yet. Use the button below
            to add your first item.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => setDialogOpen(true)}
        >
          <PackagePlusIcon /> <span>Add Item</span>
        </Button>
      </div>
    </>
  );
}

export default InvoiceItemsAccordionItemContent;
