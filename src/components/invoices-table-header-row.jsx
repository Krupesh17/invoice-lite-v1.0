import { useEffect, useState } from "react";
import { ArrowDownZAIcon, ArrowUpDownIcon, ArrowUpZAIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TableHead, TableRow } from "./ui/table";

const COLUMN_ORDER = [
  { key: "storage", label: "Storage", sortable: false },
  { key: "id", label: "ID", sortable: false },
  { key: "serial-no", label: "Serial No", sortable: false },
  { key: "total", label: "Total", sortable: true },
  { key: "items", label: "Items", sortable: true },
  { key: "status", label: "Status", sortable: false },
  { key: "created-at", label: "Created At", sortable: true },
  { key: "paid-at", label: "Paid At", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

const SortIcon = ({ state }) => {
  if (state === "asc")
    return <ArrowUpZAIcon className="text-muted-foreground" />;
  if (state === "desc")
    return <ArrowDownZAIcon className="text-muted-foreground" />;
  return <ArrowUpDownIcon className="text-muted-foreground" />;
};

function InvoicesTableHeaderRow({ onSortChange }) {
  const [sortState, setSortState] = useState({
    column: null,
    direction: null,
  });

  // ✅ Notify parent AFTER the state update has been committed, not during
  useEffect(() => {
    if (sortState.column !== null) {
      onSortChange?.(sortState);
    }
  }, [sortState, onSortChange]);

  const handleSort = (columnKey) => {
    // ✅ Updater is now pure — no side effects inside it
    setSortState((prev) => {
      const isSameColumn = prev.column === columnKey;
      const newDirection =
        isSameColumn && prev.direction === "asc" ? "desc" : "asc";
      return { column: columnKey, direction: newDirection };
    });
  };

  return (
    <TableRow>
      {COLUMN_ORDER.map(({ key, label, sortable }) => (
        <TableHead key={key}>
          <Button
            type="button"
            size="xs"
            variant="ghost"
            className="cursor-pointer"
            onClick={sortable ? () => handleSort(key) : undefined}
          >
            <span>{label}</span>
            {sortable && (
              <SortIcon
                state={sortState.column === key ? sortState.direction : null}
              />
            )}
          </Button>
        </TableHead>
      ))}
    </TableRow>
  );
}

export default InvoicesTableHeaderRow;
