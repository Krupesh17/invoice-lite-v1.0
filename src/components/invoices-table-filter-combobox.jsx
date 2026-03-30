import { useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { debounce } from "lodash";
import InvoicesTableFilterForm from "./forms/invoices-table-filter-form";
import { invoiceFilterTypes } from "@/constants";

function InvoicesTableFilterCombobox() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);

  const debounceFilter = useCallback(
    debounce((value) => {
      setFilter(value);
    }, 100),
    [],
  );

  const handleOnOpenChange = (value) => {
    setOpen(value);
    debounceFilter(null);
  };

  return (
    <Popover open={open} onOpenChange={handleOnOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className="cursor-pointer shrink-0 max-sm:p-0! max-sm:size-8!"
        >
          <SlidersHorizontalIcon />
          <span className="max-sm:hidden">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          {(filter === "storage" || filter === "status") && (
            <CommandInput placeholder="Search..." className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup className={`${filter && "hidden"}`}>
              {invoiceFilterTypes.map((item) => (
                <CommandItem
                  key={item.value}
                  value={`${item.label || ""}`}
                  onSelect={() => {
                    setFilter(item.value);
                  }}
                >
                  <item.icon />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <InvoicesTableFilterForm filter={filter} />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default InvoicesTableFilterCombobox;
