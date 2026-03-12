import { useCallback, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  ChartNoAxesColumnIncreasingIcon,
  FilePenLineIcon,
  Trash2Icon,
} from "lucide-react";
import InvoiceStatusDialog from "./invoice-status-dialog";
import InvoiceDeleteDialog from "./invoice-delete-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function InvoicesTableActionsPopover({ invoice }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const editInvoice = () => {
    if (!invoice) {
      toast.error("Missing or Invalid ID");
      return;
    }
    navigate(`/edit/${invoice?.type}/${invoice?.id}`);
  };

  const openUpdateStatusDialog = () => {
    setStatusDialogOpen(true);
  };

  const openDeleteInvoiceDialog = () => {
    setDeleteDialogOpen(true);
  };

  const popoverOptions = useMemo(
    () => [
      {
        icon: ChartNoAxesColumnIncreasingIcon,
        label: "Update Status",
        onClick: openUpdateStatusDialog,
      },
      {
        icon: FilePenLineIcon,
        label: "Edit",
        onClick: editInvoice,
      },
      {
        icon: Trash2Icon,
        label: "Delete Invoice",
        onClick: openDeleteInvoiceDialog,
      },
    ],
    [openUpdateStatusDialog, openDeleteInvoiceDialog],
  );

  return (
    <>
      <InvoiceStatusDialog
        open={isStatusDialogOpen}
        setOpen={setStatusDialogOpen}
        invoice={invoice}
      />

      <InvoiceDeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        invoice={invoice}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            size="xs"
            variant="secondary"
            className="h-5.5 rounded-sm cursor-pointer bg-gray-200 hover:bg-gray-200/80 dark:bg-secondary dark:hover:bg-secondary/80"
          >
            View
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit flex flex-col gap-1 p-1.5">
          {popoverOptions?.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="justify-start text-xs"
              onClick={item?.onClick}
            >
              <item.icon />
              {item.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default InvoicesTableActionsPopover;
