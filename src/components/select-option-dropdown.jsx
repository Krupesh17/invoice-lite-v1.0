import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SelectOptionDropdown({ value, onChange, invalid, id, items }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        aria-invalid={invalid}
        className="min-w-30"
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        {items?.map((item) => (
          <SelectItem key={item?.value} value={item?.value}>
            {item?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectOptionDropdown;
