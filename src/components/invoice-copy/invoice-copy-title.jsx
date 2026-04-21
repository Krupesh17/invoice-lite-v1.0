import { CONTENT_PAD } from "@/constants";
import { formatPx } from "@/helpers/invoice-helpers";

function InvoiceCopyTitle({ scale, invoiceDetails, theme }) {
  const p = (value) => formatPx(value, scale);

  return (
    <div
      style={{
        padding: `${p(20)} ${p(CONTENT_PAD)} ${p(12)}`,
        color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
        borderBottom:
          theme?.mode === "light"
            ? `${p(1)} solid #e5e5e5`
            : `${p(1)} solid #323232`,
      }}
    >
      <h1
        className="font-bold"
        style={{
          fontSize: p(30),
          color: theme?.mode === "light" ? "#000000" : "#ffffff",
        }}
      >
        {invoiceDetails?.invoicePrefix}
        {invoiceDetails?.serialNumber}
      </h1>
    </div>
  );
}

export default InvoiceCopyTitle;
