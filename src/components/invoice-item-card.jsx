import { PackageIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { currencies } from "@/constants";
import { updateInvoiceItems } from "@/store/slices/invoice-slice";
import { updateInvoiceItemToEdit } from "@/store/slices/dashboard-slice";

function InvoiceItemCard({ data, setDialogOpen }) {
  const dispatch = useDispatch();
  const { invoiceFields } = useSelector((state) => state?.invoice);

  const currency = currencies.filter(
    (item) => item?.code === invoiceFields?.invoiceDetails?.currency,
  )[0];

  const deleteItem = () => {
    try {
      const updateInvoiceItemsList = invoiceFields?.invoiceItems?.filter(
        (item) => item?.id !== data?.id,
      );

      dispatch(updateInvoiceItems(updateInvoiceItemsList));
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = () => {
    try {
      dispatch(updateInvoiceItemToEdit(data));
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotal = (unitPrice, quantity) => {
    const total = unitPrice * quantity;
    return Number(total).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full bg-sidebar p-3 rounded-xl flex items-center gap-2">
      <div className="size-13 text-primary bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
        <PackageIcon className="size-5" />
      </div>
      <div className="w-full">
        <h6 className="text-sm font-medium line-clamp-1">{data?.itemName}</h6>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
          {data?.itemDescription}
        </p>
        <div className="text-primary text-[10px] space-x-1">
          <span>
            {currency?.symbol}
            {/* {data?.unitPrice} */}
            {Number(data?.unitPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="text-muted-foreground">x {data?.quantity} Qty</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="hover:bg-sidebar-accent"
            onClick={editItem}
          >
            <PencilIcon />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            variant="destructive"
            onClick={deleteItem}
          >
            <Trash2Icon />
          </Button>
        </div>

        <p className="text-foreground text-[10px] space-x-1">
          <span>Total:</span>
          <span>
            {currency?.symbol}
            {/* {data?.unitPrice * data?.quantity}.00 */}
            {getTotal(data?.unitPrice, data?.quantity)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default InvoiceItemCard;
