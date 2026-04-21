import { CONTENT_PAD } from "@/constants";
import { formatPx } from "@/helpers/invoice-helpers";

function InvoiceCopyInvoiceBillByBillTo({ scale, invoiceFields, theme }) {
  const { companyDetails, clientDetails } = invoiceFields;

  const p = (value) => formatPx(value, scale);

  return (
    <div
      className="grid grid-cols-[1fr_1fr]"
      style={{
        borderBottom:
          theme?.mode === "light"
            ? `${p(1)} solid #e5e5e5`
            : `${p(1)} solid #323232`,
      }}
    >
      <InvoiceBillingDetails
        scale={scale}
        role="billedBy"
        theme={theme}
        name={companyDetails?.name}
        address={companyDetails?.address}
        customFields={companyDetails?.metadata}
      />

      <InvoiceBillingDetails
        scale={scale}
        role="billedTo"
        theme={theme}
        name={clientDetails?.name}
        address={clientDetails?.address}
        customFields={clientDetails?.metadata}
      />
    </div>
  );
}

export default InvoiceCopyInvoiceBillByBillTo;

function InvoiceBillingDetails({
  scale,
  role = "billedBy",
  theme,
  name,
  address,
  customFields,
}) {
  const p = (value) => formatPx(value, scale);

  const containerStyle = {
    gap: p(2),
    padding: `${p(14)} ${p(CONTENT_PAD)}`,
  };

  const containerBorderStyle = {
    borderRight:
      theme?.mode === "light"
        ? `${p(1)} solid #e5e5e5`
        : `${p(1)} solid #323232`,
  };

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={
        role === "billedBy"
          ? { ...containerStyle, ...containerBorderStyle }
          : containerStyle
      }
    >
      <div
        className="font-bold"
        style={{
          fontSize: p(11),
          color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
        }}
      >
        {role === "billedBy" && "Billed By"}
        {role === "billedTo" && "Billed To"}
      </div>
      {name && (
        <div
          className="font-bold"
          style={{
            fontSize: p(10),
            color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          {name}
        </div>
      )}
      {address && (
        <div
          style={{
            fontSize: p(10),
            color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
          }}
        >
          {address}
        </div>
      )}
      {customFields &&
        customFields?.map((item) => (
          <div key={item?.label} className="flex" style={{ gap: p(3) }}>
            <span
              className="text-wrap font-semibold shrink-0"
              style={{
                fontSize: p(10),
                maxWidth: p(90),
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
  );
}
