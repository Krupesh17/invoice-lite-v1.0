import {
  cardStagger,
  fadeUp,
  scaleIn,
  viewportOnce,
} from "@/motion/motion-variants";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  CodeIcon,
  DatabaseIcon,
  DownloadIcon,
  HardDriveIcon,
  SearchIcon,
  ServerIcon,
  SunMoonIcon,
} from "lucide-react";

function SectionLabel({ children }) {
  return (
    <span className="flex items-center gap-2 text-primary text-xs font-medium tracking-widest uppercase mb-4">
      <span className="block w-6 h-0.5 bg-primary rounded-full" />
      {children}
    </span>
  );
}

function FeatureIcon({ children }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/20 grid place-items-center mb-5 text-primary shrink-0">
      {children}
    </div>
  );
}

function FeatureCard({ children, large = false }) {
  return (
    <motion.div
      className={[
        "relative bg-card border rounded-[18px] p-9 overflow-hidden cursor-default hover:border-primary/30 hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
        large
          ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-10 max-md:space-y-10"
          : "",
      ].join(" ")}
      variants={scaleIn}
      whileHover={{
        y: -6,
        background: "linear-gradient(135deg, rgba(255,96,0,0.06), transparent)",
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const FILTER_CHIPS = [
  {
    label: "Local",
    active: true,
    icon: <HardDriveIcon className="size-2.5" />,
  },
  {
    label: "Server",
    active: true,
    icon: <ServerIcon className="size-2.5" />,
  },
  { label: "Status: All", active: false },
  { label: "ID: a1bc023-d0ef456", active: false },
  { label: "Apr 1 ➝ Apr 30", active: false },
  { label: "Serial: INV-0002", active: false },
];

const STATUSES = [
  {
    label: "Pending",
    className:
      "bg-yellow-400/20 text-yellow-500 dark:bg-yellow-600/20 dark:text-yellow-500",
  },
  {
    label: "success",
    className:
      "bg-green-400/20 text-green-500 dark:bg-green-600/20 dark:text-green-500",
  },
  {
    label: "Error",
    className:
      "bg-red-400/20 text-red-500 dark:bg-red-600/20 dark:text-red-500",
  },
  {
    label: "Expired",
    className: "bg-gray-200 text-muted-foreground dark:bg-muted",
  },
  {
    label: "Refunded",
    className:
      "bg-purple-400/20 text-purple-500 dark:bg-purple-600/20 dark:text-purple-500",
  },
];

function LandingFeaturesSection() {
  return (
    <section id="features" className="px-6 md:px-12 py-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionLabel>Features</SectionLabel>

          <h2
            className="font-syne font-extrabold text-foreground tracking-tight mb-3 max-w-xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Everything you need to manage invoices.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Built for freelancers, agencies, and small businesses who want speed
            without compromise.
          </p>
        </motion.div>

        {/* Cards grid — staggered */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-16"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <FeatureCard large={true}>
            {/* Left col */}
            <div>
              <FeatureIcon>
                <SearchIcon className="size-5" />
              </FeatureIcon>
              <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
                Powerful Smart Filters
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Filter by storage, date range, serial number, invoice ID, and
                status — all at once. Drill into exactly what you need in
                seconds.
              </p>
              <div className="flex flex-wrap gap-2 mt-5 rounded-xl">
                {FILTER_CHIPS.map((chip) => (
                  <motion.span
                    key={chip.label}
                    className={[
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs",
                      chip.active
                        ? "border-primary text-primary bg-primary/20"
                        : "border bg-muted text-muted-foreground",
                    ].join(" ")}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.15 }}
                  >
                    {chip.icon}
                    {chip.label}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right col */}
            <div>
              <FeatureIcon>
                <CheckCircleIcon className="size-5" />
              </FeatureIcon>
              <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
                Invoice Status Tracking
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Stay on top of every invoice with intuitive status labels.
                Update, filter, and track payment progress across your full
                history.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {STATUSES.map((status) => (
                  <motion.span
                    key={status?.label}
                    className={`h-8 px-3 flex items-center gap-1.5 rounded-lg text-xs font-semibold ${status?.className}`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {status?.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <DatabaseIcon className="size-5" />
            </FeatureIcon>
            <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
              Dual Storage System
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Store invoices locally via IndexedDB for offline access, or sync
              to Supabase for cross-device availability. Switch views with a
              single toggle.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <DownloadIcon className="size-5" />
            </FeatureIcon>
            <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
              One-Click PDF Export
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Instantly generate professional PDFs via react-pdf/renderer.
              Preview inline before downloading — no third-party tools required.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <SunMoonIcon className="size-6" />
            </FeatureIcon>
            <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
              Light & Dark Themes
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Switch between crisp light and deep dark interfaces. Your eyes,
              your rules — preferences saved automatically.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <CodeIcon className="size-5" />
            </FeatureIcon>
            <h3 className="font-syne font-bold text-lg text-foreground mb-2.5">
              Built with React & Redux
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A rock-solid foundation — React, Redux Toolkit, Shadcn UI, and
              Tailwind CSS powering a snappy, accessible experience.
            </p>
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingFeaturesSection;
