import { CONTENT_PAD } from "@/constants";
import { formatPx } from "@/helpers/invoice-helpers";
import { useSelector } from "react-redux";

function InvoiceCopyTermsNotesPaymentInformation({ scale }) {
  const p = (value) => formatPx(value, scale);

  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);

  const theme = invoiceFields?.invoiceDetails?.theme;
  const { terms, notes, paymentInformation } = invoiceFields?.metadata;

  const visibility = !!(paymentInformation?.length || terms || notes);

  return (
    <div
      style={{
        display: visibility ? "flex" : "none",
        flexDirection: "column",
        gap: p(6),
        padding: `${p(14)} ${p(CONTENT_PAD)} ${p(20)}`,
        borderTop:
          theme?.mode === "light"
            ? `${p(1)} solid #e5e5e5`
            : `${p(1)} solid #323232`,
      }}
    >
      {paymentInformation?.length > 0 && (
        <div>
          <div
            className="font-bold"
            style={{
              fontSize: p(11),
              color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
              marginBottom: p(6),
            }}
          >
            Payment Information
          </div>
          <div className="flex flex-col" style={{ gap: p(3) }}>
            {paymentInformation?.map((item) => (
              <div key={item?.label} className="flex" style={{ gap: p(12) }}>
                <span
                  className="text-wrap font-medium shrink-0"
                  style={{
                    fontSize: p(10),
                    minWidth: p(90),
                    maxWidth: p(120),
                    color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
                  }}
                >
                  {item?.label}
                </span>
                <span
                  style={{
                    fontSize: p(10),
                    maxWidth: p(280),
                    color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
                  }}
                >
                  {item?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {terms && (
        <div>
          <div
            className="font-bold"
            style={{
              fontSize: p(11),
              color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
            }}
          >
            Terms
          </div>
          <div
            style={{
              fontSize: p(10),
              lineHeight: 1.65,
              color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
            }}
          >
            {terms}
          </div>
        </div>
      )}

      {notes && (
        <div>
          <div
            className="font-bold"
            style={{
              fontSize: p(11),
              color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
            }}
          >
            Notes
          </div>
          <div
            style={{
              fontSize: p(10),
              lineHeight: 1.65,
              color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
            }}
          >
            {notes}
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceCopyTermsNotesPaymentInformation;
