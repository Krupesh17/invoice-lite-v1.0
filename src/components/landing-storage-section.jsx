import { motion } from "framer-motion";
import {
  cardStagger,
  fadeUp,
  scaleIn,
  viewportOnce,
} from "@/motion/motion-variants";
import { HardDriveIcon, ServerIcon } from "lucide-react";

const STORAGE_OPTIONS = [
  {
    label: "Local — IndexedDB",
    tag: "Works offline",
    desc: "Store invoices directly in your browser. Fully offline-capable, zero server dependency, and blazing fast retrieval — even without internet.",
    icon: <HardDriveIcon className="size-7" />,
    available: true,
  },
  {
    label: "Cloud — Supabase",
    tag: "Cross-device sync",
    desc: "Sync invoices and assets to your Supabase backend. Access your data from any device, with secure storage for logos and attachments.",
    icon: <ServerIcon className="size-7" />,
    available: false,
  },
];

function LandingStorageSection() {
  return (
    <section className="px-6 md:px-12 py-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-widest uppercase mb-4">
            <span className="block w-6 h-0.5 bg-primary rounded-full" />
            Storage
            <span className="block w-6 h-0.5 bg-primary rounded-full" />
          </span>
          <h2
            className="font-syne font-extrabold text-foreground tracking-tight mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Your data, your way.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            InvoiceLite gives you full control over where your invoices live —
            locally or in the cloud.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-16"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STORAGE_OPTIONS.map((opt) => (
            <motion.div
              key={opt.label}
              className="relative bg-card border rounded-[18px] p-9 text-center cursor-default hover:border-primary/30hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
              variants={scaleIn}
              whileHover={{
                y: -6,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {!opt.available && (
                <div className="absolute right-3 top-3 text-[10px] px-1 rounded bg-yellow-400/20 text-yellow-600 border border-yellow-400/80 dark:bg-yellow-600/20 dark:text-yellow-500 dark:border-yellow-400/20">
                  Coming Soon
                </div>
              )}
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/20 grid place-items-center mx-auto mb-5 text-primary">
                {opt.icon}
              </div>
              <h3 className="font-syne font-bold text-foreground text-xl mb-2.5">
                {opt.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {opt.desc}
              </p>
              <span className="font-syne inline-block px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold">
                {opt.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingStorageSection;
