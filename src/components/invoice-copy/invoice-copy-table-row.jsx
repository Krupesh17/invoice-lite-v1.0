import { CONTENT_PAD } from "@/constants";
import { formatAmount, formatPx } from "@/helpers/invoice-helpers";
import { useSelector } from "react-redux";

function InvoiceCopyTableRow({ item, scale }) {
  const p = (value) => formatPx(value, scale);

  const { invoiceDetails } = useSelector(
    (state) => state?.invoice?.invoiceFields,
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `1fr ${p(80)} ${p(90)} ${p(90)}`,
        padding: `${p(10)} ${p(CONTENT_PAD)}`,
        borderBottom:
          invoiceDetails?.theme?.mode === "light"
            ? `${p(1)} solid #e5e5e5`
            : `${p(1)} solid #323232`,
        alignItems: "start",
      }}
    >
      <div>
        <div
          className="font-bold text-foreground"
          style={{
            fontSize: p(10),
            marginBottom: p(2),
            color:
              invoiceDetails?.theme?.mode === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          {item?.itemName}
        </div>
        <div
          style={{
            fontSize: p(8.5),
            color:
              invoiceDetails?.theme?.mode === "light" ? "#737373" : "#AFAFAF",
          }}
        >
          {item?.itemDescription}
        </div>
      </div>
      <div
        className="text-center"
        style={{
          fontSize: p(10),
          paddingTop: p(1),
          color:
            invoiceDetails?.theme?.mode === "light" ? "#000000" : "#FFFFFF",
        }}
      >
        {item?.quantity}
      </div>
      <div
        className="text-right"
        style={{
          fontSize: p(10),
          paddingTop: p(1),
          color:
            invoiceDetails?.theme?.mode === "light" ? "#000000" : "#FFFFFF",
        }}
      >
        {formatAmount(item?.unitPrice)}
      </div>
      <div
        className="text-right"
        style={{
          fontSize: p(10),
          paddingTop: p(1),
          color:
            invoiceDetails?.theme?.mode === "light" ? "#000000" : "#FFFFFF",
        }}
      >
        {formatAmount(item?.quantity * item?.unitPrice)}
      </div>
    </div>
  );
}

export default InvoiceCopyTableRow;
