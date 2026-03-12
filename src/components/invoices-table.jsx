import { useMemo } from "react";
import { Table, TableBody, TableHeader } from "./ui/table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import InvoicesTableHeaderRow from "./invoices-table-header-row";
import InvoicesTableBodyRow from "./invoices-table-body-row";
import { useFetchInvoicesQuery } from "@/store/services/invoice-api";

// Moved outside component — pure functions, no need to recreate on every render
const getInvoiceItemsTotal = (invoiceItems) =>
  invoiceItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

const invoiceDataFilter = (invoice) => {
  try {
    if (!invoice || typeof invoice !== "object") {
      throw new Error("Invalid data: expected a non-null object.");
    }
    return {
      id: invoice?.id,
      type: invoice?.type,
      serialNumber: `${invoice?.invoiceDetails?.invoicePrefix}${invoice?.invoiceDetails?.serialNumber}`,
      currency: invoice?.invoiceDetails?.currency,
      total: getInvoiceItemsTotal(invoice?.invoiceItems),
      items: invoice?.invoiceItems?.length,
      status: invoice?.status,
      createdAt: invoice?.createdAt,
      paidAt: invoice?.paidAt,
    };
  } catch (err) {
    console.error(err?.message);
  }
};

function InvoicesTable() {
  const { data: invoices, isLoading } = useFetchInvoicesQuery();

  // Memoized so transformation only reruns when `invoices` reference changes
  const filteredInvoices = useMemo(
    () => invoices?.map(invoiceDataFilter) ?? [],
    [invoices],
  );

  if (isLoading) return null;

  return (
    <ScrollArea className="w-full rounded-md border">
      <Table className="text-xs min-w-200">
        <TableHeader className="bg-muted">
          <InvoicesTableHeaderRow />
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoiceData) => (
            <InvoicesTableBodyRow
              key={invoiceData?.id}
              invoiceData={invoiceData}
            />
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default InvoicesTable;
