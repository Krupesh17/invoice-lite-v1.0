import { memo } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import {
  CheckIcon,
  HardDriveIcon,
  HourglassIcon,
  PackageIcon,
  RotateCcwIcon,
  ServerIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currencyMap } from "@/constants";
import InvoicesTableActionsPopover from "./invoices-table-actions-popover";
import { timestampToReadableDateTime } from "@/helpers/timestamp";

// Defined at module scope — object literals are created once, not on every render
const STORAGE_TYPES = {
  local: {
    label: "Local",
    icon: <HardDriveIcon />,
    className: "bg-indigo-600/20 text-indigo-500",
  },
  server: {
    label: "Server",
    icon: <ServerIcon />,
    className: "bg-pink-600/20 text-pink-500",
  },
};

const STATUS_CODES = {
  pending: {
    label: "Pending",
    icon: <HourglassIcon />,
    className:
      "bg-yellow-400/20 text-yellow-500 dark:bg-yellow-600/20 dark:text-yellow-500",
  },
  success: {
    label: "Success",
    icon: <CheckIcon />,
    className:
      "bg-green-400/20 text-green-500 dark:bg-green-600/20 dark:text-green-500",
  },
  error: {
    label: "Error",
    icon: <XIcon />,
    className:
      "bg-red-400/20 text-red-500 dark:bg-red-600/20 dark:text-red-500",
  },
  expired: {
    label: "Expired",
    icon: <TriangleAlertIcon />,
    className: "bg-gray-200 text-muted-foreground dark:bg-muted",
  },
  refunded: {
    label: "Refunded",
    icon: <RotateCcwIcon />,
    className:
      "bg-purple-400/20 text-purple-500 dark:bg-purple-600/20 dark:text-purple-500",
  },
};

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
  const storage = STORAGE_TYPES[type];
  return (
    <Badge variant="secondary" className={cn("rounded-sm", storage?.className)}>
      {storage?.icon} <span>{storage?.label}</span>
    </Badge>
  );
}

function ItemsBadge({ items }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-sm text-muted-foreground bg-gray-200 dark:bg-secondary"
    >
      <PackageIcon /> <span>{items ?? 0}</span>
    </Badge>
  );
}

function StatusBadge({ status }) {
  const code = STATUS_CODES[status];
  return (
    <Badge variant="secondary" className={cn("rounded-sm", code?.className)}>
      {code?.icon} <span>{code?.label}</span>
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
