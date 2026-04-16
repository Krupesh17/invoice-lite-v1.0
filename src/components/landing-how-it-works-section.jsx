import { motion } from "framer-motion";
import {
  cardStagger,
  fadeUp,
  scaleIn,
  viewportOnce,
} from "@/motion/motion-variants";

const STEPS = [
  {
    num: "01",
    title: "Create an Invoice",
    desc: "Fill in client details, line items, dates, and serial number. Set your currency and payment terms.",
  },
  {
    num: "02",
    title: "Choose Storage",
    desc: "Save locally for offline access via IndexedDB, or push to Supabase for cloud sync and backup.",
  },
  {
    num: "03",
    title: "Export & Track",
    desc: "Download a polished PDF, update status as payments arrive, and filter your history with precision.",
  },
];
function LandingHowItWorksSection() {
  return (
    <section className="px-6 md:px-12 py-24 relative z-10 bg-accent dark:bg-accent/15 border-y">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-widest uppercase mb-4">
            <span className="block w-6 h-0.5 bg-primary rounded-full" />
            How it works
            <span className="block w-6 h-0.5 bg-primary rounded-full" />
          </span>
          <h2
            className="font-syne font-extrabold text-foreground tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Three steps to your first invoice.
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden bg-border"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              className="bg-card p-10 relative"
              variants={scaleIn}
            >
              {/* Big number */}
              <motion.div
                className="font-syne font-extrabold text-primary text-5xl leading-none mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                {step.num}
              </motion.div>
              <h3 className="font-syne font-bold text-foreground text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingHowItWorksSection;
