import { useState, useEffect, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { debounce } from "lodash";

function ColorPickerCombobox({ value, onChange, invalid, id }) {
  const [open, setOpen] = useState(false);
  const [internalColor, setInternalColor] = useState(value || "#FF6900");

  // Sync internal state with external value
  useEffect(() => {
    if (value) {
      setInternalColor(value);
    }
  }, [value]);

  // Debounced onChange for color picker
  const debouncedOnChange = useCallback(
    debounce((color) => {
      onChange?.(color);
    }, 100),
    [onChange]
  );

  const handleColorChange = (newColor) => {
    const upperColor = newColor.toUpperCase();
    setInternalColor(upperColor);
    debouncedOnChange(upperColor);
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value.trim();
    
    // Auto-add # if user forgets
    if (newValue && !newValue.startsWith("#")) {
      newValue = "#" + newValue;
    }
    
    setInternalColor(newValue);
    
    // Trigger onChange for all changes so validation can run
    onChange?.(newValue);
  };

  const handleInputBlur = () => {
    // Normalize the color format on blur
    const normalized = internalColor.toUpperCase();
    setInternalColor(normalized);
    onChange?.(normalized);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="p-0 overflow-hidden shrink-0 w-8 h-8 border-2"
            aria-label="Pick a color"
            id={id}
            aria-invalid={invalid}
            style={{
              borderColor: invalid ? "hsl(var(--destructive))" : undefined,
            }}
          >
            <div
              className="w-full h-full"
              style={{ 
                backgroundColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(internalColor) 
                  ? internalColor 
                  : "#FF6900" 
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={internalColor} onChange={handleColorChange} />
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        className="h-8 font-mono text-sm uppercase"
        value={internalColor}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="#FF6900"
        maxLength={7}
        aria-invalid={invalid}
      />
    </div>
  );
}

export default ColorPickerCombobox;