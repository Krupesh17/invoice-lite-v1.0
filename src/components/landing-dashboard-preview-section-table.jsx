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

const invoices = [
  {
    type: "local",
    id: "3e4b7833-c424-451c-a197-3389249799ea",
    serialNo: "Invoice INV-0001",
    total: "$1191",
    items: 2,
    status: "success",
    createdAt: "22/03/2026 - 9:44 AM",
    paidAt: "08/04/2026 - 3:31 AM",
  },
  {
    type: "server",
    id: "dfde0ebe-667d-429c-9fdd-ca04556e8f6c",
    serialNo: "Invoice INV-0002",
    total: "$849",
    items: 1,
    status: "pending",
    createdAt: "02/03/2026 - 5:10 PM",
    paidAt: null,
  },
];

const TABLE_HEADERS = [
  "Storage",
  "ID",
  "Serial No",
  "Total",
  "Items",
  "Status",
  "Created At",
  "Paid At",
  "Actions",
];

const STORAGE_STYLES = {
  local: {
    icon: HardDriveIcon,
    label: "Local",
    className: "bg-primary/20 text-primary",
  },
  server: {
    icon: ServerIcon,
    label: "Server",
    className: "bg-pink-600/20 text-pink-500",
  },
};

const STATUS_BADGES = {
  pending: {
    label: "Pending",
    icon: HourglassIcon,
    className:
      "bg-yellow-400/20 text-yellow-500 dark:bg-yellow-600/20 dark:text-yellow-500",
  },
  success: {
    label: "Success",
    icon: CheckIcon,
    className:
      "bg-green-400/20 text-green-500 dark:bg-green-600/20 dark:text-green-500",
  },
  error: {
    label: "Error",
    icon: XIcon,
    className:
      "bg-green-400/20 text-green-500 dark:bg-green-600/20 dark:text-green-500",
  },
  expired: {
    label: "Expired",
    icon: TriangleAlertIcon,
    className: "bg-gray-200 text-muted-foreground dark:bg-muted",
  },
  refunded: {
    label: "Refunded",
    icon: RotateCcwIcon,
    className:
      "bg-purple-400/20 text-purple-500 dark:bg-purple-600/20 dark:text-purple-500",
  },
};

function Badge({ className, children }) {
  return (
    <div
      className={`h-5 px-2 inline-flex items-center gap-1 rounded ${className}`}
    >
      {children}
    </div>
  );
}

function StorageBadge({ type }) {
  const { icon: Icon, label, className } = STORAGE_STYLES[type] ?? {};
  return (
    <Badge className={className}>
      {Icon && <Icon className="size-3" />}
      <span className="whitespace-nowrap">{label}</span>
    </Badge>
  );
}

function ItemsBadge({ items }) {
  return (
    <Badge className="text-muted-foreground bg-muted">
      <PackageIcon className="size-3" />
      <span className="whitespace-nowrap">{items}</span>
    </Badge>
  );
}

function StatusBadge({ status }) {
  const { label, icon: Icon, className } = STATUS_BADGES[status] ?? {};
  return (
    <Badge className={className}>
      {Icon && <Icon className="size-3" />}
      <span className="whitespace-nowrap">{label}</span>
    </Badge>
  );
}

function DateCell({ value, fallback }) {
  return value ? (
    <span className="whitespace-nowrap text-muted-foreground">{value}</span>
  ) : (
    <Badge className="text-muted-foreground bg-muted">
      <span className="whitespace-nowrap">{fallback}</span>
    </Badge>
  );
}

function TableRow({ item }) {
  return (
    <tr className="h-10 bg-background border border-b text-left">
      <td className="text-xs font-normal px-4">
        <StorageBadge type={item.type} />
      </td>
      <td className="text-xs font-normal px-4 text-muted-foreground whitespace-nowrap">
        {item.id}
      </td>
      <td className="text-xs font-normal px-4 whitespace-nowrap">
        {item.serialNo}
      </td>
      <td className="text-xs font-normal px-4 whitespace-nowrap">
        {item.total}
      </td>
      <td className="text-xs font-normal px-4">
        <ItemsBadge items={item.items} />
      </td>
      <td className="text-xs font-normal px-4">
        <StatusBadge status={item.status} />
      </td>
      <td className="text-xs font-normal px-4">
        <DateCell value={item.createdAt} fallback="Undefined" />
      </td>
      <td className="text-xs font-normal px-4">
        <DateCell value={item.paidAt} fallback="Unpaid" />
      </td>
      <td className="text-xs font-normal px-4">
        <Badge className="text-foreground bg-accent">
          <span className="whitespace-nowrap">View</span>
        </Badge>
      </td>
    </tr>
  );
}

export default function LandingDashboardPreviewSectionTable() {
  return (
    <table className="w-full bg-background">
      <thead>
        <tr className="h-10 bg-accent dark:bg-accent text-left">
          {TABLE_HEADERS.map((header) => (
            <th
              key={header}
              className="text-xs font-medium px-4 whitespace-nowrap"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {invoices.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
