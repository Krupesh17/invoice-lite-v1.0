import { PAGE_PADDING } from "@/constants";
import { formatPx } from "@/helpers/invoice-helpers";
import { useSelector } from "react-redux";
import InvoiceCopyHeader from "./invoice-copy-header";
import InvoiceCopyTableHeader from "./invoice-copy-table-header";
import InvoiceCopyTableRow from "./invoice-copy-table-row";
import InvoiceCopyFooterBlock from "./invoice-copy-footer-block";

function InvoiceCopy({ pageDesc, scale }) {
  const p = (value) => formatPx(value, scale);
  const { items, showHeader, showFooter } = pageDesc;

  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);

  const theme = invoiceFields?.invoiceDetails?.theme;

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: theme?.mode === "light" ? "#ffffff" : "#121212",
        padding: p(PAGE_PADDING),
      }}
    >
      {showHeader && <InvoiceCopyHeader scale={scale} />}
      {(showHeader || items.length > 0) && (
        <InvoiceCopyTableHeader scale={scale} />
      )}
      <div style={{ flexShrink: 0 }}>
        {items.map((item) => (
          <InvoiceCopyTableRow key={item?.id} item={item} scale={scale} />
        ))}
      </div>
      <div style={{ flex: 1 }} />
      {showFooter && <InvoiceCopyFooterBlock scale={scale} />}
    </div>
  );
}

export default InvoiceCopy;
