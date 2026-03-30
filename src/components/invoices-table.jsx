import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableHeader } from "./ui/table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import InvoicesTableHeaderRow from "./invoices-table-header-row";
import InvoicesTableBodyRow from "./invoices-table-body-row";
import { useFetchInvoicesQuery } from "@/store/services/invoice-api";
import { sortBy } from "@/helpers/data-sort";
import { FileXCornerIcon } from "lucide-react";
import InvoicesTableFilterNavbar from "./invoices-table-filter-navbar";
import InvoicesTablePaginationBar from "./invoices-table-pagination-bar";
import { selectInvoicesTableFilters } from "@/store/slices/dashboard-slice";

const PAGE_SIZE = 10;

const SORT_KEY_MAP = {
  total: { property: "total", type: "number" },
  items: { property: "items", type: "number" },
  "created-at": { property: "createdAt", type: "date" },
  "paid-at": { property: "paidAt", type: "date" },
};

const getInvoiceItemsTotal = (invoiceItems) =>
  invoiceItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

const toInvoiceRow = (invoice) => {
  if (!invoice || typeof invoice !== "object") {
    console.warn("toInvoiceRow: skipping invalid invoice entry", invoice);
    return null;
  }
  return {
    id: invoice.id,
    type: invoice.type,
    serialNumber: `${invoice.invoiceDetails?.invoicePrefix}${invoice.invoiceDetails?.serialNumber}`,
    currency: invoice.invoiceDetails?.currency,
    total: getInvoiceItemsTotal(invoice.invoiceItems),
    items: invoice.invoiceItems?.length ?? 0,
    status: invoice.status,
    createdAt: invoice.createdAt,
    paidAt: invoice.paidAt,
  };
};

// --- Filter predicate ---
// Each active filter must match; unset filters are skipped.
const applyFilters = (rows, filters) => {
  const { storage, status, id, serialNo, createdAt, paidAt } = filters;

  return rows.filter((row) => {
    // storage — multi-select, skip if empty
    if (storage?.length > 0 && !storage.includes(row.type)) return false;

    // status — multi-select, skip if empty
    if (status?.length > 0 && !status.includes(row.status)) return false;

    // id — partial, case-insensitive substring match
    if (id?.trim() && !row.id?.toLowerCase().includes(id.trim().toLowerCase()))
      return false;

    // serialNo — partial, case-insensitive substring match
    if (
      serialNo?.trim() &&
      !row.serialNumber?.toLowerCase().includes(serialNo.trim().toLowerCase())
    )
      return false;

    // createdAt range
    if (createdAt?.from || createdAt?.to) {
      const date = row.createdAt ? new Date(row.createdAt) : null;
      if (!date) return false;
      if (createdAt.from && date < new Date(createdAt.from)) return false;
      if (createdAt.to) {
        const toDate = new Date(createdAt.to);
        toDate.setHours(23, 59, 59, 999); // 👈 include full "To" day
        if (date > toDate) return false;
      }
    }

    // paidAt range
    if (paidAt?.from || paidAt?.to) {
      const date = row.paidAt ? new Date(row.paidAt) : null;
      if (!date) return false;
      if (paidAt.from && date < new Date(paidAt.from)) return false;
      if (paidAt.to) {
        const toDate = new Date(paidAt.to);
        toDate.setHours(23, 59, 59, 999); // 👈 include full "To" day
        if (date > toDate) return false;
      }
    }

    return true;
  });
};

function InvoicesTable() {
  const [sortState, setSortState] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: invoices = [], isLoading } = useFetchInvoicesQuery();
  const filters = useSelector(selectInvoicesTableFilters);

  const filteredList = useMemo(() => {
    // 1. Shape raw API data into display rows
    const rows = invoices.map(toInvoiceRow).filter(Boolean);

    // 2. Apply active filters
    const filtered = applyFilters(rows, filters);

    // 3. Sort the filtered result
    if (!sortState?.column) return filtered;

    const { property, type } = SORT_KEY_MAP[sortState.column] ?? {};
    if (!property) return filtered;

    return sortBy(filtered, property, sortState.direction, type);
  }, [invoices, filters, sortState]);

  // Reset to page 1 whenever filters/sort change produces a new list
  const totalPages = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));

  // Clamp currentPage in case filtered results shrink below current page
  const safePage = Math.min(currentPage, totalPages);

  // Slice the current page's records
  const invoiceList = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, safePage]);

  // Reset to page 1 when filters or sort change
  const handleSortChange = (newSort) => {
    setCurrentPage(1);
    setSortState(newSort);
  };

  if (isLoading) return null;

  const isEmpty = invoiceList.length === 0;

  return (
    <>
      <InvoicesTableFilterNavbar />

      <ScrollArea className="w-full rounded-md border">
        <Table className="text-xs min-w-200">
          <TableHeader className="bg-muted">
            <InvoicesTableHeaderRow onSortChange={handleSortChange} />
          </TableHeader>
          <TableBody>
            {!isEmpty &&
              invoiceList.map((invoiceData) => (
                <InvoicesTableBodyRow
                  key={invoiceData?.id}
                  invoiceData={invoiceData}
                />
              ))}
          </TableBody>
        </Table>

        {isEmpty && (
          <div className="h-80 flex items-center">
            <div className="max-w-80 mx-auto flex flex-col items-center">
              <div className="bg-sidebar h-14 aspect-square rounded-xl flex items-center justify-center shrink-0 mb-2">
                <FileXCornerIcon className="size-8 text-muted-foreground" />
              </div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                No Data Found
              </h4>
              <p className="text-center text-xs text-muted-foreground/80 dark:text-muted-foreground/40">
                No data found for the selected filters. Please try different
                filters or clear all filters to see all data.
              </p>
            </div>
          </div>
        )}

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <InvoicesTablePaginationBar
        currentPage={safePage}
        totalPages={totalPages}
        totalRecords={filteredList.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default InvoicesTable;
