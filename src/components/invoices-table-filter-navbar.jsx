import { useDispatch, useSelector } from "react-redux";
import InvoicesTableFilterCombobox from "./invoices-table-filter-combobox";
import InvoicesTableFilterTabsBox from "./invoices-table-filter-tabs-box";
import {
  resetInvoicesTableFilters,
  selectHasActiveInvoiceFilters,
} from "@/store/slices/dashboard-slice";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

function InvoicesTableFilterNavbar() {
  const dispatch = useDispatch();
  const hasActiveFilters = useSelector(selectHasActiveInvoiceFilters);

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <InvoicesTableFilterCombobox />
      <InvoicesTableFilterTabsBox />
      {hasActiveFilters && (
        <Button
          type="button"
          size="sm"
          variant="destructive"
          className="cursor-pointer shrink-0 max-sm:p-0! max-sm:size-8!"
          onClick={() => dispatch(resetInvoicesTableFilters())}
        >
          <XIcon /> <span className="max-sm:hidden">Clear</span>
        </Button>
      )}
    </div>
  );
}

export default InvoicesTableFilterNavbar;
