import { useState } from "react";
import { ImagePlusIcon, SignatureIcon } from "lucide-react";
import useResizeObserver from "@/hooks/use-resize-observer";
import SelectImagePreviewImageBox from "./select-image-preview-image-box";
import CompanyDetailsForm from "./forms/company-details-form";
import SelectImageRightSideDrawer from "./select-image-right-side-drawer";

const ImageSelectPreviewContainers = [
  {
    label: "Company Logo",
    icon: <ImagePlusIcon className="text-primary" />,
    type: "logo",
  },
  {
    label: "Company Signature",
    icon: <SignatureIcon className="text-primary" />,
    type: "signature",
  },
];

function CompanyDetailsAccordionItemContent() {
  const { ref, width } = useResizeObserver();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState("logo");

  const handleImageSelectPreview = (type) => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  return (
    <>
      <SelectImageRightSideDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        drawerType={drawerType}
      />

      <div
        ref={ref}
        className={`w-full flex gap-4 ${width <= 1000 ? "flex-col" : "flex-row"}`}
      >
        <div
          className={`w-full grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 ${width > 1000 && "sm:max-w-96 shrink-0"}`}
        >
          {ImageSelectPreviewContainers?.map((item) => (
            <SelectImagePreviewImageBox
              key={item?.type}
              label={item?.label}
              icon={item?.icon}
              type={item?.type}
              onClick={() => handleImageSelectPreview(item?.type)}
            />
          ))}
        </div>

        <CompanyDetailsForm />
      </div>
    </>
  );
}

export default CompanyDetailsAccordionItemContent;
