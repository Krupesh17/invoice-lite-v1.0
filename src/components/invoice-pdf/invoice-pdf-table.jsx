import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import React from "react";
import styles from "./styles";
import { Text, View } from "@react-pdf/renderer";
import { formatAmount } from "./helpers/invoice-data-formatters";

function InvoicePdfTable({ invoice }) {
  const { invoiceItems, invoiceDetails } = invoice;

  const tableStyle = {
    flex: 1,
    fontFamily: "Geist",
    backgroundColor:
      invoiceDetails?.theme?.mode === "light" ? "#FFFFFF" : "#181818",
    color: invoiceDetails?.theme?.mode === "light" ? "#000000" : "#FFFFFF",
    border: 0,
  };

  return (
    <Table style={tableStyle}>
      <TableHead theme={invoiceDetails?.theme} />
      {invoiceItems?.map((invoice, index) => (
        <TableBodyRow
          key={index}
          invoice={invoice}
          currency={invoiceDetails?.currency}
          theme={invoiceDetails?.theme}
        />
      ))}
    </Table>
  );
}

export default InvoicePdfTable;

function TableHead({ theme }) {
  const THStyle = {
    backgroundColor: theme?.mode === "light" ? theme?.baseColor : "#242424",
    color: "#FFFFFF",
  };

  return (
    <TH style={THStyle} fixed={true}>
      {["Item", "Qty", "Price", "Total"].map((item, index) => {
        const config =
          index > 0
            ? {
                weighting: 0.15,
                style: {
                  padding: "5 10",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }
            : { weighting: 0.6, style: { padding: "5 10" } };

        return (
          <TD
            weighting={config?.weighting}
            style={[styles.text_xxs, styles.font_medium, config?.style]}
          >
            {item}
          </TD>
        );
      })}
    </TH>
  );
}

function TableBodyRow({ invoice, currency, theme }) {
  const TRStyle = {
    borderBottom:
      theme?.mode === "light" ? "1px solid #e5e5e5" : "1px solid #323232",
  };

  const itemNameStyle = {
    color: theme?.mode === "light" ? "#000000" : "#FFFFFF",
  };
  const itemDescriptionStyle = {
    color: theme?.mode === "light" ? "#737373" : "#AFAFAF",
  };

  return (
    <TR style={TRStyle} wrap={false}>
      <TD weighting={0.6} style={[styles.text_xxs, { padding: "5 10" }]}>
        <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Text style={[styles.text_xxs, itemNameStyle]}>
            {invoice?.itemName}
          </Text>
          {invoice?.itemDescription && (
            <Text style={[styles.text_xxxs, itemDescriptionStyle]}>
              {invoice?.itemDescription}
            </Text>
          )}
        </View>
      </TD>

      {["quantity", "unitPrice", "total"].map((property) => {
        return (
          <TD
            key={property}
            weighting={0.15}
            style={[
              styles.text_xxxs,
              {
                padding: "5 10",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            {property === "quantity" && invoice?.quantity}
            {property === "unitPrice" && (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>{formatAmount(invoice?.unitPrice, currency)}</Text>
              </View>
            )}
            {property === "total" && (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>
                  {formatAmount(
                    invoice?.unitPrice * invoice?.quantity,
                    currency,
                  )}
                </Text>
              </View>
            )}
          </TD>
        );
      })}
    </TR>
  );
}
