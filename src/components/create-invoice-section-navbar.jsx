import DownloadPopover from "./download-popover";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImportIcon } from "lucide-react";

function CreateInvoiceSectionNavbar({
  selectedLayout,
  setSelectedLayout,
  layoutOptions,
}) {
  return (
    <nav className="sticky top-0 bg-background h-16 border-b flex shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" variant="outline">
          <ImportIcon />
          <span>Import</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Select value={selectedLayout} onValueChange={setSelectedLayout}>
          <SelectTrigger className="w-32" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {layoutOptions?.map((item) => (
                <SelectItem key={item?.value} value={item?.value}>
                  {item?.icon}
                  <span>{item?.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DownloadPopover />
      </div>
    </nav>
  );
}

export default CreateInvoiceSectionNavbar;
