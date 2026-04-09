import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

function InvoicePdfCustomLabelValueItem({
  label,
  value,
  role = "base",
  theme,
}) {
  const labelStyle =
    role === "billing"
      ? {
          color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
          maxWidth: "100px",
        }
      : {
          color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
          width: "100px",
        };

  const valueStyle = {
    color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
    maxWidth: "180px",
  };

  return (
    <View
      style={[
        { display: "flex", flexDirection: "row", gap: 2 },
        styles.text_xxxs,
      ]}
    >
      <Text style={labelStyle}>{label}</Text>

      <Text style={valueStyle}>{value}</Text>
    </View>
  );
}

export default InvoicePdfCustomLabelValueItem;
