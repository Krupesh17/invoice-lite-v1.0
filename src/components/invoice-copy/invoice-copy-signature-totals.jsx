import { CONTENT_PAD } from "@/constants";
import {
  computeTotals,
  formatAmount,
  formatPx,
} from "@/helpers/invoice-helpers";
import { useSelector } from "react-redux";

function InvoiceCopySignatureTotals({ scale }) {
  const p = (value) => formatPx(value, scale);

  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);

  const theme = invoiceFields?.invoiceDetails?.theme;

  const { subtotal, extras, total } = computeTotals(invoiceFields);

  return (
    <div
      style={{ marginBottom: p(20) }}
      className="flex justify-between items-end"
    >
      {invoiceFields?.companyDetails?.signature && (
        <img
          src={invoiceFields?.companyDetails?.signature}
          style={{
            width: 94 * scale,
            height: 94 * scale,
          }}
        />
      )}
      <div
        className="flex flex-col ml-auto"
        style={{
          minWidth: p(300),
        }}
      >
        <div
          style={{
            borderBottom:
              theme?.mode === "light"
                ? `${p(1)} solid #e5e5e5`
                : `${p(1)} solid #323232`,
          }}
        >
          <div
            className="flex justify-between"
            style={{
              padding: `${p(4)} ${p(CONTENT_PAD)}`,
            }}
          >
            <span
              style={{
                fontSize: p(9.5),
                color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
              }}
            >
              Subtotal
            </span>
            <span
              style={{
                fontSize: p(9.5),
                color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
              }}
            >
              {formatAmount(subtotal)}
            </span>
          </div>
          {extras?.map((item) => (
            <div
              key={item?.label}
              className="flex justify-between"
              style={{
                padding: `${p(4)} ${p(CONTENT_PAD)}`,
              }}
            >
              <span
                style={{
                  fontSize: p(9.5),
                  color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
                }}
              >
                {item?.label}
              </span>
              <span
                style={{
                  fontSize: p(9.5),
                  color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
                }}
              >
                {item?.type === "percentage"
                  ? `${item?.value}%`
                  : formatAmount(item?.amount)}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex justify-between font-semibold"
          style={{
            padding: `${p(6)} ${p(CONTENT_PAD)}`,
            color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          <span
            style={{
              fontSize: p(11),
            }}
          >
            Total
          </span>
          <span
            style={{
              fontSize: p(11),
            }}
          >
            {formatAmount(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCopySignatureTotals;
