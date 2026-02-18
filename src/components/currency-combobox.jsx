import { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencies } from "@/constants";

function CurrencyCombobox({ value, onChange, invalid, id }) {
  const [open, setOpen] = useState(false);

  const selectedCurrency = useMemo(
    () =>
      currencies.find(
        (currency) => currency.code === value || currency.name === value,
      ),
    [value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={invalid}
          size="sm"
          id={id}
          className="w-full justify-between font-normal"
        >
          {selectedCurrency ? (
            <span className="flex items-center gap-2">
              <span>{selectedCurrency.code}</span>
              <span className="text-xs text-primary bg-primary/20 py-0.5 px-1.5 rounded-[5px]">
                {selectedCurrency.symbol}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select currency...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={`${currency.code} ${currency.symbol} ${currency.name || ""}`}
                  onSelect={() => {
                    onChange(currency.code);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === currency.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="flex items-center gap-2 flex-1">
                    <span className="font-medium">{currency.code}</span>
                    <span className="text-xs text-primary bg-primary/20 py-0.5 px-1.5 rounded-sm">
                      {currency.symbol}
                    </span>
                    {currency.name && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {currency.name}
                      </span>
                    )}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CurrencyCombobox;
