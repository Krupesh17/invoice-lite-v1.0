import { Image, View } from "@react-pdf/renderer";
import InvoicePdfCustomLabelValueItem from "./invoice-pdf-custom-label-value-item";
import { formatDate } from "@/helpers/invoice-helpers";

function InvoicePdfInvoiceDetails({ invoice }) {
  const { serialNumber, invoiceDate, invoiceDueDate, paymentTerms, currency } =
    invoice?.invoiceDetails;

  const { mode } = invoice?.invoiceDetails?.theme;

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: mode === "light" ? "1px solid #e5e5e5" : "1px solid #323232",
  };

  return (
    <View style={containerStyle}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 10,
          overflow: "hidden",
        }}
      >
        {serialNumber && (
          <InvoicePdfCustomLabelValueItem
            label={"Serial Number"}
            value={serialNumber}
            theme={invoice?.invoiceDetails?.theme}
          />
        )}
        {invoiceDate && (
          <InvoicePdfCustomLabelValueItem
            label={"Date"}
            value={formatDate(invoiceDate)}
            theme={invoice?.invoiceDetails?.theme}
          />
        )}
        {invoiceDueDate && (
          <InvoicePdfCustomLabelValueItem
            label={"Due Date"}
            value={formatDate(invoiceDueDate)}
            theme={invoice?.invoiceDetails?.theme}
          />
        )}
        {paymentTerms && (
          <InvoicePdfCustomLabelValueItem
            label={"Payment Terms"}
            value={paymentTerms}
            theme={invoice?.invoiceDetails?.theme}
          />
        )}
        {currency && (
          <InvoicePdfCustomLabelValueItem
            label={"Currency"}
            value={currency}
            theme={invoice?.invoiceDetails?.theme}
          />
        )}
      </View>

      {invoice?.companyDetails?.logo && (
        <View
          style={{
            width: "95px",
          }}
        >
          <Image
            src={{ uri: invoice?.companyDetails?.logo, format: "jpg" }}
            style={{ width: "100%" }}
          />
        </View>
      )}
    </View>
  );
}

export default InvoicePdfInvoiceDetails;
