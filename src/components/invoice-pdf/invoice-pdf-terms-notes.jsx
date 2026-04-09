import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";
import InvoicePdfCustomLabelValueItem from "./invoice-pdf-custom-label-value-item";

function InvoicePdfTermsNotes({ invoice }) {
  const { theme } = invoice?.invoiceDetails;
  const { notes, terms, paymentInformation } = invoice?.metadata;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    gap: 4,
    borderTop:
      theme?.mode === "light" ? "1px solid #e5e5e5" : "1px solid #323232",
  };

  const titleStyle = {
    fontWeight: "medium",
    color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
  };

  return (
    (notes || terms || paymentInformation?.length) && (
      <View style={containerStyle} wrap={false}>
        {paymentInformation?.length && (
          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Text style={[styles.text_xxs, titleStyle]}>
              Payment Information
            </Text>

            {paymentInformation?.map((item, index) => (
              <InvoicePdfCustomLabelValueItem
                key={index}
                label={item?.label}
                value={item?.value}
                theme={theme}
              />
            ))}
          </View>
        )}

        {notes && (
          <TermsNotesContent role="notes" content={notes} theme={theme} />
        )}
        {terms && (
          <TermsNotesContent role="terms" content={terms} theme={theme} />
        )}
      </View>
    )
  );
}

export default InvoicePdfTermsNotes;

function TermsNotesContent({ role = "terms", content = "", theme }) {
  const roleStyle = {
    fontWeight: "medium",
    color: theme?.mode === "light" ? theme?.baseColor : "#FFFFFF",
  };

  const contentStyle = {
    color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
  };

  return (
    <View
      style={[
        { display: "flex", flexDirection: "column", gap: 4 },
        styles.text_xxs,
      ]}
    >
      <Text style={roleStyle}>
        {role === "terms" && "Terms"}
        {role === "notes" && "Notes"}
      </Text>
      <Text style={[styles.text_xxxs, contentStyle]}>{content}</Text>
    </View>
  );
}
