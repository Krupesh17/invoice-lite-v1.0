import { useState } from "react";
import { PackagePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import AddInvoiceItemDialog from "./add-invoice-item-dialog";
import InvoiceItemCard from "./invoice-item-card";
import { useDispatch, useSelector } from "react-redux";
import { resetInvoiceItemToEdit } from "@/store/slices/dashboard-slice";

function InvoiceItemsAccordionItemContent() {
  const dispatch = useDispatch();
  const { invoiceFields } = useSelector((state) => state?.invoice);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddInvoiceItemDialog open={isDialogOpen} setOpen={setDialogOpen} />

      <div className="w-full space-y-4">
        {invoiceFields?.invoiceItems?.length === 0 ? (
          <div className="space-y-1 text-xs">
            <h6 className="text-foreground font-medium">No Items Yet</h6>
            <p className="text-muted-foreground">
              No items have been added to this invoice yet. Use the button below
              to add your first item.
            </p>
          </div>
        ) : (
          invoiceFields?.invoiceItems?.map((item, index) => (
            <InvoiceItemCard
              key={index}
              data={item}
              setDialogOpen={setDialogOpen}
            />
          ))
        )}

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => {
            dispatch(resetInvoiceItemToEdit());
            setDialogOpen(true);
          }}
        >
          <PackagePlusIcon /> <span>Add Item</span>
        </Button>
      </div>
    </>
  );
}

export default InvoiceItemsAccordionItemContent;
