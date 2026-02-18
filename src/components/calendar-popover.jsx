import React, { useState } from "react";
import { CalendarPlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

function CalendarPopover({ value, onChange, invalid, id }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="popover"
          aria-expanded={open}
          aria-invalid={invalid}
          size="sm"
          id={id}
          className={`w-full justify-start font-normal ${value ? "text-foreground" : "text-muted-foreground"}`}
        >
          <CalendarPlusIcon />
          <span>
            {value
              ? value?.toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Select a date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto border-none">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(value) => {
            onChange(value);
            setOpen(false);
          }}
          className="rounded-lg border"
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

export default CalendarPopover;
