import { CONTENT_PAD } from "@/constants";
import { formatDate, formatPx } from "@/helpers/invoice-helpers";

function InvoiceCopyInvoiceDetailsLogo({ scale, invoiceFields, theme }) {
  const p = (value) => formatPx(value, scale);

  const { serialNumber, invoiceDate, invoiceDueDate, paymentTerms, currency } =
    invoiceFields?.invoiceDetails;

  return (
    <div
      className="flex justify-between items-center"
      style={{
        borderBottom:
          theme?.mode === "light"
            ? `${p(1)} solid #e5e5e5`
            : `${p(1)} solid #323232`,
      }}
    >
      <div
        className="flex flex-col"
        style={{ gap: p(4), padding: `${p(14)} ${p(CONTENT_PAD)}` }}
      >
        {serialNumber && (
          <InvoiceCopyLabelValue
            scale={scale}
            theme={theme}
            label={"Serial Number"}
            value={serialNumber}
          />
        )}

        {invoiceDate && (
          <InvoiceCopyLabelValue
            scale={scale}
            theme={theme}
            label={"Date"}
            value={formatDate(invoiceDate)}
          />
        )}

        {invoiceDueDate && (
          <InvoiceCopyLabelValue
            scale={scale}
            theme={theme}
            label={"Due Date"}
            value={formatDate(invoiceDueDate)}
          />
        )}

        {paymentTerms && (
          <InvoiceCopyLabelValue
            scale={scale}
            theme={theme}
            label={"Payment Terms"}
            value={formatDate(paymentTerms)}
          />
        )}

        {currency && (
          <InvoiceCopyLabelValue
            scale={scale}
            theme={theme}
            label={"Currency"}
            value={currency}
          />
        )}
      </div>

      {invoiceFields?.companyDetails?.logo && (
        <img
          src={invoiceFields?.companyDetails?.logo}
          style={{
            width: 94 * scale,
            height: 94 * scale,
          }}
        />
      )}
    </div>
  );
}

export default InvoiceCopyInvoiceDetailsLogo;

function InvoiceCopyLabelValue({ scale, theme, label, value }) {
  const p = (value) => formatPx(value, scale);

  return (
    <div className="flex" style={{ gap: p(12) }}>
      <span
        className="text-wrap font-semibold text-foreground shrink-0"
        style={{
          fontSize: p(10),
          minWidth: p(90),
          maxWidth: p(120),
          color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
        }}
      >
        {label}
      </span>
      <span
        className="text-muted-foreground"
        style={{
          fontSize: p(10),
          maxWidth: p(280),
          color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
        }}
      >
        {value}
      </span>
    </div>
  );
}
