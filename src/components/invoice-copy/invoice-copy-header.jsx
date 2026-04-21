import { useSelector } from "react-redux";
import InvoiceCopyTitle from "./invoice-copy-title";
import InvoiceCopyInvoiceBillByBillTo from "./invoice-copy-invoice-bill-by-bill-to";
import InvoiceCopyInvoiceDetailsLogo from "./invoice-copy-invoice-details-logo";

function InvoiceCopyHeader({ scale }) {
  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);
  const theme = invoiceFields?.invoiceDetails?.theme;

  return (
    <div>
      <InvoiceCopyTitle
        scale={scale}
        invoiceDetails={invoiceFields?.invoiceDetails}
        theme={theme}
      />

      <InvoiceCopyInvoiceDetailsLogo
        scale={scale}
        invoiceFields={invoiceFields}
        theme={theme}
      />

      <InvoiceCopyInvoiceBillByBillTo
        scale={scale}
        invoiceFields={invoiceFields}
        theme={theme}
      />
    </div>
  );
}

export default InvoiceCopyHeader;
