import { useEffect, useState } from "react";
import CreateInvoiceSectionAccordion from "./create-invoice-section-accordion";
import CreateInvoiceSectionNavbar from "./create-invoice-section-navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Columns2Icon, FormIcon, ViewIcon } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { getInvoiceById } from "@/utils/indexedDB/invoices-store";
import { useDispatch } from "react-redux";
import {
  resetInvoiceFields,
  updateInvoiceFields,
} from "@/store/slices/invoice-slice";

const layoutOptionList = [
  { icon: <FormIcon />, label: "Form", value: "form" },
  { icon: <ViewIcon />, label: "Preview", value: "preview" },
  { icon: <Columns2Icon />, label: "Both", value: "both" },
];

function CreateInvoiceSection() {
  const { pathname } = useLocation();
  const { storage, invoiceId } = useParams();
  const isEditPath = pathname.split("/")[1] === "edit";

  const [isReady, setIsReady] = useState(!isEditPath); // true immediately if not edit

  const dispatch = useDispatch();

  const getInvoiceToEdit = async () => {
    try {
      let result;
      if (storage === "local") {
        result = await getInvoiceById(invoiceId);
      }
      return result;
    } catch (err) {
      console.error(err?.message);
    }
  };

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

  useEffect(() => {
    if (!isEditPath) return;

    const load = async () => {
      const data = await getInvoiceToEdit();
      if (data) {
        dispatch(updateInvoiceFields(data));
        setIsReady(true); // ✅ only mount forms after data is in Redux
      }
    };

    load();
  }, [isEditPath]);

  useEffect(() => {
    return () => {
      dispatch(resetInvoiceFields());
    };
  }, []);

  return (
    <section className="relative w-full h-full overflow-hidden">
      <CreateInvoiceSectionNavbar
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        layoutOptions={visibleOptions}
      />

      <div className="h-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] divide-x divide-border overflow-hidden">
        {(selectedLayout === "both" || selectedLayout === "form") &&
          isReady && <CreateInvoiceSectionAccordion />}
        {(selectedLayout === "both" || selectedLayout === "preview") && (
          <div className="w-full h-full bg-accent dark:bg-background"></div>
        )}
      </div>
    </section>
  );
}

export default CreateInvoiceSection;
