import { Image, Text, View } from "@react-pdf/renderer";
import styles from "./styles";
import { formatAmount } from "@/helpers/invoice-helpers";

function computeTotals(invoice) {
  const subtotal = invoice.invoiceItems.reduce(
    (s, i) => s + i.quantity * i.unitPrice,
    0,
  );
  const extras = invoice.invoiceDetails.billingDetails.map((b) => ({
    label: b.label,
    value: b.value,
    type: b.type,
    amount: b.type === "percentage" ? (subtotal * b.value) / 100 : b.value,
  }));
  const total = subtotal + extras.reduce((s, e) => s + e.amount, 0);
  return { subtotal, extras, total };
}

function InvoicePdfTotal({ invoice }) {
  const { companyDetails, invoiceDetails } = invoice;

  const { subtotal, extras, total } = computeTotals(invoice);

  const subtotalContainer = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 10,
    borderBottom:
      invoiceDetails?.theme?.mode === "light"
        ? "1px solid #e5e5e5"
        : "1px solid #323232",
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: "95px" }}>
        {companyDetails?.signature && (
          <Image
            src={{ uri: companyDetails?.signature, format: "jpg" }}
            style={{ width: "100%" }}
          />
        )}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: 290,
          overflow: "hidden",
        }}
      >
        <View style={subtotalContainer}>
          <BillingField
            label={"Subtotal"}
            value={subtotal}
            currency={invoiceDetails?.currency}
            theme={invoiceDetails?.theme}
          />

          {extras.map((item, index) => (
            <BillingField
              key={index}
              label={item?.label}
              value={item?.value}
              type={item?.type}
              currency={invoiceDetails?.currency}
              theme={invoiceDetails?.theme}
            />
          ))}
        </View>

        <BillingField
          role="total"
          label={"Total"}
          value={total}
          currency={invoiceDetails?.currency}
          theme={invoiceDetails?.theme}
        />
      </View>
    </View>
  );
}

export default InvoicePdfTotal;

function BillingField({
  role = "subtotal",
  label,
  value,
  type = "fixed",
  currency,
  theme,
}) {
  const containerStyle =
    role === "subtotal"
      ? [
          { color: theme?.mode === "light" ? "#000000" : "#FFFFFF" },
          styles.text_xxxs,
        ]
      : [
          {
            color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
            padding: 10,
          },
          styles.text_xxs,
        ];

  const valueFieldStyle =
    role === "subtotal"
      ? {
          display: "block",
          color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
        }
      : { display: "block" };

  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        ...containerStyle,
      ]}
    >
      <Text style={{ width: "100px" }}>{label}</Text>
      <Text style={valueFieldStyle}>
        {type === "percentage" ? `${value}%` : formatAmount(value, currency)}
      </Text>
    </View>
  );
}
