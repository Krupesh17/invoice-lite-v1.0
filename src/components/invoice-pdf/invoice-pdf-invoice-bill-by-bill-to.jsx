import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";
import InvoicePdfCustomLabelValueItem from "./invoice-pdf-custom-label-value-item";

function InvoicePdfInvoiceBillByBillTo({ invoice }) {
  const { companyDetails, clientDetails, invoiceDetails } = invoice;
  return (
    <View style={[{ display: "flex", flexDirection: "row" }]}>
      <InvoiceBillingDetails
        role="billedBy"
        theme={invoiceDetails?.theme}
        name={companyDetails?.name}
        address={companyDetails?.address}
        customFields={companyDetails?.metadata}
      />

      <InvoiceBillingDetails
        role="billedTo"
        theme={invoiceDetails?.theme}
        name={clientDetails?.name}
        address={clientDetails?.address}
        customFields={clientDetails?.metadata}
      />
    </View>
  );
}

export default InvoicePdfInvoiceBillByBillTo;

function InvoiceBillingDetails({
  role = "billedBy",
  theme,
  name,
  address,
  customFields,
}) {
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 10,
    overflow: "hidden",
  };

  const containerBorderStyle = {
    borderRight:
      theme?.mode === "light" ? "1px solid #e5e5e5" : "1px solid #323232",
  };

  const nameStyle = {
    fontWeight: "medium",
    color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
  };

  const addressStyle = {
    color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
  };

  return (
    <View
      style={
        role === "billedBy"
          ? [containerStyle, containerBorderStyle]
          : containerStyle
      }
    >
      <Text
        style={[
          styles.text_xxs,
          { fontWeight: "medium", color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF" },
        ]}
      >
        {role === "billedBy" && "Billed By"}
        {role === "billedTo" && "Billed To"}
      </Text>

      {name && <Text style={[styles.text_xxxs, nameStyle]}>{name}</Text>}

      {address && (
        <Text style={[styles.text_xxxs, addressStyle]}>{address}</Text>
      )}

      {customFields &&
        customFields?.map((item, index) => (
          <InvoicePdfCustomLabelValueItem
            key={index}
            role="billing"
            label={item?.label}
            value={item?.value}
            theme={theme}
          />
        ))}
    </View>
  );
}
