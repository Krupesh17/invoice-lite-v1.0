import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearInvoicesTableFilter } from "@/store/slices/dashboard-slice";
import InvoicesTableFilterTab from "./invoices-table-filter-tab";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function getActiveFilters(filter) {
  if (!filter) return [];
  const active = [];

  if (filter.storage?.length > 0)
    active.push({ type: "storage", value: filter.storage });

  if (filter.status?.length > 0)
    active.push({ type: "status", value: filter.status });

  if (filter.id?.trim()) active.push({ type: "id", value: filter.id });

  if (filter.serialNo?.trim())
    active.push({ type: "serialNo", value: filter.serialNo });

  if (filter.createdAt?.from || filter.createdAt?.to)
    active.push({ type: "createdAt", value: filter.createdAt });

  if (filter.paidAt?.from || filter.paidAt?.to)
    active.push({ type: "paidAt", value: filter.paidAt });

  return active;
}

function InvoicesTableFilterTabsBox() {
  const dispatch = useDispatch();
  const invoicesTableFilters = useSelector(
    (state) => state.dashboard.invoicesTableFilters,
  );

  const handleRemove = useCallback(
    (type) => {
      dispatch(clearInvoicesTableFilter(type));
    },
    [dispatch],
  );

  const activeFilters = getActiveFilters(invoicesTableFilters);

  if (activeFilters.length === 0) return null;

  return (
    <ScrollArea className="h-8 w-full rounded-xl overflow-hidden">
      <section className="h-8 w-full flex items-center gap-2">
        {activeFilters.map((filter) => (
          <InvoicesTableFilterTab
            key={filter.type}
            type={filter.type}
            value={filter.value}
            onRemove={handleRemove}
          />
        ))}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default InvoicesTableFilterTabsBox;
