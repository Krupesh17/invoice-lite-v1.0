import { CONTENT_PAD } from "@/constants";
import { formatPx } from "@/helpers/invoice-helpers";
import { useSelector } from "react-redux";

function InvoiceCopyTableHeader({ scale }) {
  const p = (value) => formatPx(value, scale);

  const invoiceDetails = useSelector(
    (state) => state?.invoice?.invoiceFields?.invoiceDetails,
  );

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `1fr ${p(80)} ${p(90)} ${p(90)}`,
        background:
          invoiceDetails?.theme?.mode === "light"
            ? invoiceDetails?.theme?.baseColor
            : "#242424",
        padding: `${p(10)} ${p(CONTENT_PAD)}`,
      }}
    >
      {[
        ["Item", "left"],
        ["Qty", "center"],
        ["Price", "right"],
        ["Total", "right"],
      ].map(([label, align]) => (
        <div
          key={label}
          className="font-bold"
          style={{
            color: "#FFFFFF",
            fontSize: p(9.5),
            textAlign: align,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default InvoiceCopyTableHeader;
