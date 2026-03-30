import {
  invoiceFilterTypesObject,
  statusCodesObject,
  storageTypesObject,
} from "@/constants";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { invoicesTableFilterTabDateFormatter } from "@/helpers/timestamp";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

function InvoicesTableFilterTab({ type, value, onRemove }) {
  const filterType = type ? invoiceFilterTypesObject[type] : null;

  if (!filterType) return null;

  const isTypeOrStatus =
    filterType.value === "storage" || filterType.value === "status";
  const isSearch = filterType.value === "id" || filterType.value === "serialNo";
  const isDate =
    filterType.value === "createdAt" || filterType.value === "paidAt";

  return (
    <div className="h-8 border rounded-full flex items-center overflow-hidden divide-x shrink-0">
      <div className="h-full flex items-center gap-1 px-2">
        <filterType.icon className="size-3.5" />
        <span className="text-xs font-medium">{filterType.label}</span>
      </div>

      <LinkingVerb filterType={filterType} />

      {isTypeOrStatus && (
        <TypeFilterContent type={filterType.value} items={value} />
      )}
      {isSearch && <SearchFilterContent value={value} />}
      {isDate && <DateFilterContent value={value} />}

      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="cursor-pointer rounded-none shrink-0"
        onClick={() => onRemove?.(type)}
      >
        <XIcon className="size-3.5" />
      </Button>
    </div>
  );
}

export default InvoicesTableFilterTab;


function LinkingVerb({ filterType }) {
  let verb = null;

  if (filterType.value === "storage" || filterType.value === "status") {
    verb = "is";
  } else if (filterType.value === "id" || filterType.value === "serialNo") {
    verb = "contains";
  } else if (
    filterType.value === "createdAt" ||
    filterType.value === "paidAt"
  ) {
    verb = "is between";
  }

  if (!verb) return null;

  return (
    <div className="h-full flex items-center text-xs text-muted-foreground px-2">
      <span>{verb}</span>
    </div>
  );
}

function TypeFilterContent({ type, items }) {
  const badges = type === "storage" ? storageTypesObject : statusCodesObject;
  const label = type === "storage" ? "Storage" : "Status";

  const visibleItems = items.slice(0, 3);
  const totalCount = items.length;

  return (
    <div className="h-full flex items-center gap-1.5 text-xs text-muted-foreground px-2">
      {visibleItems.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className={cn("rounded-sm text-xs", badges[item]?.className)}
        >
          {badges[item]?.label ?? item}
        </Badge>
      ))}
      {totalCount > 1 && (
        <span className="text-foreground shrink-0">
          {totalCount} {label}s
        </span>
      )}
    </div>
  );
}

function SearchFilterContent({ value }) {
  return (
    <span className="h-full flex items-center text-xs px-2 max-w-40 truncate">
      {value}
    </span>
  );
}

function DateFilterContent({ value }) {
  const from = invoicesTableFilterTabDateFormatter(value?.from);
  const to = invoicesTableFilterTabDateFormatter(value?.to);

  return (
    <div className="h-full flex items-center gap-1 text-xs px-2 text-muted-foreground">
      {from && <span className="text-foreground">{from}</span>}
      {from && to && <span>–</span>}
      {to && <span className="text-foreground">{to}</span>}
      {!from && to && <span className="text-foreground">Until {to}</span>}
      {from && !to && <span className="text-foreground">From {from}</span>}
    </div>
  );
}
