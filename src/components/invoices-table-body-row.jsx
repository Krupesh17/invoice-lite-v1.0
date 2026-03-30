import { memo } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { PackageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  currencyMap,
  statusCodesObject,
  storageTypesObject,
} from "@/constants";
import InvoicesTableActionsPopover from "./invoices-table-actions-popover";
import { timestampToReadableDateTime } from "@/helpers/timestamp";
import TooltipWrapper from "./tooltip-wrapper";

// memo prevents re-render when parent re-renders but invoiceData prop hasn't changed
const InvoicesTableBodyRow = memo(function InvoicesTableBodyRow({
  invoiceData,
}) {
  const symbol = currencyMap[invoiceData?.currency] || invoiceData?.currency;

  return (
    <TableRow className="hover:bg-background">
      <TableCell>
        <StorageBadge type={invoiceData?.type} />
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">{invoiceData?.id}</span>
      </TableCell>
      <TableCell>{invoiceData?.serialNumber}</TableCell>
      <TableCell>
        <span>{symbol}</span>
        <span>{invoiceData?.total}</span>
      </TableCell>
      <TableCell>
        <ItemsBadge items={invoiceData?.items} />
      </TableCell>
      <TableCell>
        <StatusBadge status={invoiceData?.status} />
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {timestampToReadableDateTime(invoiceData?.createdAt)}
        </span>
      </TableCell>
      <TableCell>
        <PaidAtBadge paidAt={invoiceData?.paidAt} />
      </TableCell>
      <TableCell>
        <InvoicesTableActionsPopover invoice={invoiceData} />
      </TableCell>
    </TableRow>
  );
});

export default InvoicesTableBodyRow;

function StorageBadge({ type }) {
  const storage = storageTypesObject[type];
  return (
    <Badge variant="secondary" className={cn("rounded-sm", storage?.className)}>
      <storage.icon /> <span>{storage?.label}</span>
    </Badge>
  );
}

function ItemsBadge({ items }) {
  return (
    <TooltipWrapper content={`${items ?? 0} items in this invoice`}>
      <Badge
        variant="secondary"
        className="rounded-sm text-muted-foreground bg-gray-200 dark:bg-secondary"
      >
        <PackageIcon /> <span>{items ?? 0}</span>
      </Badge>
    </TooltipWrapper>
  );
}

function StatusBadge({ status }) {
  const code = statusCodesObject[status];
  return (
    <Badge variant="secondary" className={cn("rounded-sm", code?.className)}>
      <code.icon /> <span>{code?.label}</span>
    </Badge>
  );
}

function PaidAtBadge({ paidAt }) {
  return paidAt ? (
    <span className="text-muted-foreground">
      {timestampToReadableDateTime(paidAt)}
    </span>
  ) : (
    <Badge
      variant="secondary"
      className="rounded-sm text-muted-foreground bg-gray-200 dark:bg-secondary"
    >
      <span>Unpaid</span>
    </Badge>
  );
}
