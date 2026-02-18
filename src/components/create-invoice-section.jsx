import { useEffect, useState } from "react";
import CreateInvoiceSectionAccordion from "./create-invoice-section-accordion";
import CreateInvoiceSectionNavbar from "./create-invoice-section-navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Columns2Icon, FormIcon, ViewIcon } from "lucide-react";

const layoutOptionList = [
  { icon: <FormIcon />, label: "Form", value: "form" },
  { icon: <ViewIcon />, label: "Preview", value: "preview" },
  { icon: <Columns2Icon />, label: "Both", value: "both" },
];

function CreateInvoiceSection() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [selectedLayout, setSelectedLayout] = useState(
    isSmallScreen ? "form" : "both",
  );

  const visibleOptions = isSmallScreen
    ? layoutOptionList.filter((option) => option.value !== "both")
    : layoutOptionList;

  useEffect(() => {
    if (isSmallScreen && selectedLayout === "both") {
      setSelectedLayout("form");
    } else if (
      !isSmallScreen &&
      (selectedLayout === "form" || selectedLayout === "preview")
    ) {
      setSelectedLayout("both");
    }
  }, [isSmallScreen]);

  return (
    <section className="relative w-full h-full overflow-hidden">
      <CreateInvoiceSectionNavbar
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        layoutOptions={visibleOptions}
      />

      <div className="h-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] divide-x divide-border overflow-hidden">
        {(selectedLayout === "both" || selectedLayout === "form") && (
          <CreateInvoiceSectionAccordion />
        )}
        {(selectedLayout === "both" || selectedLayout === "preview") && (
          <div className="w-full h-full bg-accent dark:bg-background"></div>
        )}
      </div>
    </section>
  );
}

export default CreateInvoiceSection;
