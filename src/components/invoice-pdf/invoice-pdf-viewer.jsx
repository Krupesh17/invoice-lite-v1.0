import { PDFViewer } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import InvoicePdf from ".";

function InvoicePdfViewer() {
  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);
  return (
    <PDFViewer className="w-full h-full" showToolbar={false}>
      <InvoicePdf invoice={invoiceFields} />
    </PDFViewer>
  );
}

export default InvoicePdfViewer;
