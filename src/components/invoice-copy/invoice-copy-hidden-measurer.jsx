import { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_WIDTH } from "@/constants";
import InvoiceCopyHeader from "./invoice-copy-header";
import InvoiceCopyTableHeader from "./invoice-copy-table-header";
import InvoiceCopyTableRow from "./invoice-copy-table-row";
import InvoiceCopyFooterBlock from "./invoice-copy-footer-block";

function InvoiceCopyHiddenMeasurer({ onMeasured }) {
  const ref = useRef(null);
  const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const header = el.querySelector("[data-block='header']");
    const tblHead = el.querySelector("[data-block='table-header']");
    const footer = el.querySelector("[data-block='footer']");
    const rows = [...el.querySelectorAll("[data-block='row']")];

    onMeasured({
      invoice: invoiceFields,
      headerH: header ? header.getBoundingClientRect().height : 0,
      tableHeadH: tblHead ? tblHead.getBoundingClientRect().height : 0,
      footerH: footer ? footer.getBoundingClientRect().height : 0,
      rowHeights: rows.map((r) => r.getBoundingClientRect().height),
    });
  }, [onMeasured]);

  return (
    <div
      ref={ref}
      className="fixed top-0 -left-2499.75 invisible pointer-events-none -z-1 bg-white"
      style={{
        width: BASE_WIDTH,
      }}
    >
      <div data-block="header">
        <InvoiceCopyHeader scale={1} />
      </div>
      <div data-block="table-header">
        <InvoiceCopyTableHeader scale={1} />
      </div>
      {invoiceFields?.invoiceItems.map((item) => (
        <div key={item?.id} data-block="row">
          <InvoiceCopyTableRow item={item} scale={1} />
        </div>
      ))}
      <div data-block="footer">
        <InvoiceCopyFooterBlock scale={1} />
      </div>
    </div>
  );
}

export default InvoiceCopyHiddenMeasurer;
