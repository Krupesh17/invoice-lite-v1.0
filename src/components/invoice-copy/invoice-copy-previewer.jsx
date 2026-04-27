import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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
        const cw = Math.floor(e.contentRect.width) - 40;
        setCanvasWidth(Math.max(cw, 300));
        setScale(Math.max(cw, 300) / BASE_WIDTH);
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const canvasHeight = Math.round(canvasWidth * A4_RATIO);

  return (
    <>
      {isDataReady && !measured && (
        <InvoiceCopyHiddenMeasurer onMeasured={handleMeasured} />
      )}

      <div
        className="w-full h-[calc(100dvh-130px)] overflow-y-auto overflow-x-hidden shell-scrollbar"
        ref={containerRef}
      >
        {pageLayout && (
          <div className="flex flex-col items-center gap-5 p-5 min-h-full">
            {pageLayout.map((pageDesc, idx) => (
              <div
                key={idx}
                className="shrink-0 bg-white overflow-hidden w-full"
                style={{ height: canvasHeight }}
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
