import { motion } from "framer-motion";
import {
  slideInLeft,
  slideInRight,
  viewportOnce,
} from "@/motion/motion-variants";
import { CalendarIcon, DollarSignIcon } from "lucide-react";

const LINE_ITEMS = [
  { item: "UI/UX Design", qty: 2, price: "$800.00", total: "$1,600.00" },
  { item: "Frontend Dev", qty: 1, price: "$1,200.00", total: "$1,200.00" },
];

const HIGHLIGHTS = ["In-app preview", "One-click download", "Custom branding"];

function InvoiceMockup() {
  return (
    <div className="pdf-card-stack w-[320px]">
      <div className="bg-card border rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
        {/* ── Invoice Header ── */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-center justify-between mb-4">
            {/* Logo mark + brand */}
            <div className="flex items-center gap-2">
              <span className="font-syne font-semibold text-foreground text-lg">
                Invoice INV-0001
              </span>
            </div>

            {/* Paid badge */}
            <span className="h-5 px-2.5 flex items-center rounded-full bg-green-500/15 text-green-500 text-[0.6rem] font-semibold">
              Paid
            </span>
          </div>

          {/* Meta pills — Date & Currency */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 h-5 rounded-lg bg-secondary border text-[0.62rem] text-muted-foreground">
              <CalendarIcon className="size-2.5" />
              <span className="leading-0.5">09 / 04 / 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 h-5 rounded-lg bg-secondary border text-[0.62rem] text-muted-foreground">
              <DollarSignIcon className="size-2.5" />
              <span className="leading-0.5">USD</span>
            </div>
          </div>
        </div>
        {/* ── Billed By / Billed To ── */}
        <div className="grid grid-cols-2 gap-0 border-b border-theme">
          <div className="px-5 py-4 border-r border-theme">
            <p className="text-[0.58rem] font-syne font-bold text-primary uppercase tracking-widest mb-2">
              Billed By
            </p>
            <p className="font-syne font-bold text-foreground text-xs mb-1">
              InvoiceLite Ltd
            </p>
            <p className="text-muted-foreground text-[0.62rem] leading-relaxed">
              1234 Main Street,
              <br />
              Anytown, USA
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[0.58rem] font-syne font-bold text-primary uppercase tracking-widest mb-2">
              Billed To
            </p>
            <p className="font-syne font-bold text-foreground text-xs mb-1">
              John Doe
            </p>
            <p className="text-muted-foreground text-[0.62rem] leading-relaxed">
              4567 Elm Street,
              <br />
              Anytown, USA
            </p>
          </div>
        </div>

        {/* ── Items Table ── */}
        <div className="px-5 pt-4 pb-5">
          {/* Table head */}
          <div className="grid grid-cols-[1fr_0.4fr_0.6fr_0.6fr] gap-1 mb-2 pb-2 border-b">
            {["Item", "Qty", "Price", "Total"].map((h) => (
              <span
                key={h}
                className="text-[0.58rem] font-syne font-bold text-muted-foreground uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {LINE_ITEMS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_0.4fr_0.6fr_0.6fr] gap-1 py-1.5 border-b last:border-0 items-center"
            >
              <span className="text-foreground text-[0.65rem] font-medium leading-tight">
                {row.item}
              </span>
              <span className="text-muted-foreground text-[0.62rem]">
                {row.qty}
              </span>
              <span className="text-muted-foreground text-[0.62rem]">
                {row.price}
              </span>
              <span className="text-foreground text-[0.65rem] font-semibold">
                {row.total}
              </span>
            </div>
          ))}

          {/* Subtotal / Total */}
          <div className="mt-3 pt-3 border-t space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-dm text-[0.65rem]">
                Subtotal
              </span>
              <span className="text-foreground text-[0.65rem] font-semibold">
                $2,800.00
              </span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t">
              <span className="font-syne font-bold text-foreground text-xs">
                Total
              </span>
              <span className="font-syne font-bold text-primary text-sm">
                $2,800.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPdfExportSection() {
  return (
    <section className="px-6 md:px-12 py-24 relative z-10 bg-accent dark:bg-accent/15 border-y">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Text — slides in from left */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="flex items-center gap-2 text-primary text-xs font-medium tracking-widest uppercase mb-4">
            <span className="block w-6 h-0.5 bg-primary rounded-full" />
            PDF Export
          </span>
          <h2
            className="font-syne font-extrabold text-foreground tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Professional invoices, ready to send.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Built on react-pdf/renderer, InvoiceLite generates pixel-perfect
            PDFs you can preview right in the app — then download with a single
            click.
          </p>
          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map((tag, i) => (
              <motion.div
                key={tag}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm text-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.3 + i * 0.08,
                }}
              >
                <strong className="text-primary font-syne">✓</strong> {tag}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Invoice mockup — slides in from right */}
        <motion.div
          className="flex justify-center"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <InvoiceMockup />
        </motion.div>
      </div>
    </section>
  );
}

export default LandingPdfExportSection;
