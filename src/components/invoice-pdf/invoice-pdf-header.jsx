import { Text } from "@react-pdf/renderer";
import styles from "./styles";

function InvoicePdfHeader({ invoice }) {
  const { invoicePrefix, serialNumber } = invoice?.invoiceDetails;
  const { mode } = invoice?.invoiceDetails?.theme;

  const headerStyle = {
    fontWeight: "semibold",
    padding: 10,
    borderBottom: mode === "light" ? "1px solid #e5e5e5" : "1px solid #323232",
  };

  return (
    <Text style={[styles.text_3xl, headerStyle]}>
      {invoicePrefix && <Text>{invoicePrefix}</Text>}
      {serialNumber && <Text>{serialNumber}</Text>}
    </Text>
  );
}

export default InvoicePdfHeader;
