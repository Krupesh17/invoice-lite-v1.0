import { Document, Page } from "@react-pdf/renderer";
import InvoicePdfHeader from "./invoice-pdf-header";
import InvoicePdfInvoiceDetails from "./invoice-pdf-invoice-details";
import InvoicePdfInvoiceBillByBillTo from "./invoice-pdf-invoice-bill-by-bill-to";
import InvoicePdfTable from "./invoice-pdf-table";
import InvoicePdfTotal from "./invoice-pdf-total";
import InvoicePdfTermsNotes from "./invoice-pdf-terms-notes";

function InvoicePdf({ invoice }) {
  const invoiceTitle = `${invoice?.invoiceDetails?.invoicePrefix}${invoice?.invoiceDetails?.serialNumber}`;
  const { mode } = invoice?.invoiceDetails?.theme;

  const pageStyle = {
    fontFamily: "Geist",
    backgroundColor: mode === "light" ? "#ffffff" : "#181818",
    color: mode === "light" ? "#000000" : "#ffffff",
  };

  return (
    <Document title={invoiceTitle}>
      <Page size="A4" style={pageStyle}>
        <InvoicePdfHeader invoice={invoice} />
        <InvoicePdfInvoiceDetails invoice={invoice} />
        <InvoicePdfInvoiceBillByBillTo invoice={invoice} />
        <InvoicePdfTable invoice={invoice} />
        <InvoicePdfTotal invoice={invoice} />
        <InvoicePdfTermsNotes invoice={invoice} />
      </Page>
    </Document>
  );
}

export default InvoicePdf;
