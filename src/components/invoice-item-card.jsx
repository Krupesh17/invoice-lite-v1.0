import { PackageIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

function InvoiceItemCard({ itemName, itemDescription, currency, quantity }) {
  return (
    <div className="w-full bg-sidebar p-3 rounded-xl flex items-center gap-2">
      <div className="size-13 text-primary bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
        <PackageIcon className="size-5" />
      </div>
      <div className="w-full">
        <h6 className="text-sm font-medium line-clamp-1">Item Name</h6>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
          Item Description
        </p>
        <div className="text-primary text-[10px] space-x-1">
          <span>$ 1.00</span>
          <span className="text-muted-foreground">x 1 Qty</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="hover:bg-sidebar-accent"
          >
            <PencilIcon />
          </Button>
          <Button type="button" size="icon-xs" variant="destructive">
            <Trash2Icon />
          </Button>
        </div>

        <p className="text-foreground text-[10px] space-x-1">
          Total: <span>$1.00</span>
        </p>
      </div>
    </div>
  );
}

export default InvoiceItemCard;
