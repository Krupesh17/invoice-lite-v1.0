// InvoiceCopyPreviewer.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"; // ← add
import { A4_RATIO, BASE_WIDTH } from "@/constants";
import { buildPageLayout } from "@/helpers/invoice-helpers";
import InvoiceCopyHiddenMeasurer from "./invoice-copy-hidden-measurer";
import InvoiceCopy from ".";

function InvoiceCopyPreviewer() {
  const containerRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(BASE_WIDTH);
  const [scale, setScale] = useState(1);
  const [pageLayout, setPageLayout] = useState(null);
  const [measured, setMeasured] = useState(false);

  const handleMeasured = useCallback((layout) => {
    const pages = buildPageLayout(layout);
    setPageLayout(pages);
    setMeasured(true);
  }, []);

 const invoiceFields = useSelector((state) => state?.invoice?.invoiceFields);
const isDataReady = invoiceFields != null;
const prevInvoiceFieldsRef = useRef(invoiceFields);

useEffect(() => {
  if (prevInvoiceFieldsRef.current === invoiceFields) return;
  prevInvoiceFieldsRef.current = invoiceFields;
  setMeasured(false);
  setPageLayout(null);
}, [invoiceFields]);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        const cw = Math.floor(Math.min(width, height / A4_RATIO));
        setCanvasWidth(cw);
        setScale(cw / BASE_WIDTH);
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const canvasHeight = Math.round(canvasWidth * A4_RATIO);
  const multiPage = pageLayout && pageLayout.length > 1;

  return (
    <>
      {/* Wait for real data before measuring */}
      {isDataReady &&
        !measured && ( // ← changed
          <InvoiceCopyHiddenMeasurer onMeasured={handleMeasured} />
        )}
      <div className="relative w-full h-[calc(100dvh-130px)] bg-sidebar p-5 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-5 pointer-events-none opacity-0"
          ref={containerRef}
        />

        {pageLayout && (
          <div className={`scroller${multiPage ? " multi" : ""}`}>
            {pageLayout.map((pageDesc, idx) => (
              <div
                key={idx}
                className="shrink-0 bg-white overflow-hidden"
                style={{ width: canvasWidth, height: canvasHeight }}
              >
                <InvoiceCopy pageDesc={pageDesc} scale={scale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InvoiceCopyPreviewer;
