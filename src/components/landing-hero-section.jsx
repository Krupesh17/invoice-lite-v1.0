import {
  blobPulse,
  fadeIn,
  fadeUpFast,
  heroStagger,
} from "@/motion/motion-variants";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import LandingAnimatedUnderline from "./landing-animated-underline";

const statPills = [
  { strong: "PDF", label: "exports built-in" },
  { strong: "Dual", label: "storage — local & cloud" },
  { strong: "5+", label: "status filters" },
  { strong: "Dark", label: "& light mode" },
];

function LandingHeroSection() {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => navigate("/create/invoice"), []);

  return (
    <section className="relative min-h-screen grid place-items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      {/* Background grid */}
      <div className="hero-grid" />

      {/* Orange glow blob */}
      <div className="pointer-events-none absolute top-2 left-2/4 w-175 h-175 bg-[radial-gradient(circle,rgba(255,96,0,0.12)_0%,transparent_65%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl w-full"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUpFast}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-9 text-primary text-xs font-medium tracking-widest uppercase bg-primary/15 border-primary/20"
        >
          <span className="animate-blink w-1.5 h-1.5 rounded-full bg-primary" />
          Smart Invoice Management
        </motion.div>

        <motion.h1
          variants={fadeUpFast}
          className="font-syne font-extrabold tracking-tight leading-[1.08] mb-7 text-foreground"
          style={{ fontSize: "clamp(2.3rem, 8vw, 6.5rem)" }}
        >
          Invoice.
          <br />
          <em className="relative text-primary pb-0.5">
            Simplified
            <LandingAnimatedUnderline />
          </em>
          . Delivered.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUpFast}
          className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light"
        >
          Create, manage, and track invoices with real-time status updates, dual
          storage, and beautiful PDF exports — all from one clean dashboard.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpFast}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Button
            type="button"
            className="group font-syne h-14 px-8! rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,96,0,0.35)]"
            onClick={handleNavigation}
          >
            <span>Get Started Free</span>
            <ArrowRightIcon
              strokeWidth={2.5}
              className="size-5 group-hover:ml-1 transition-all ease-in-out"
            />
          </Button>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          variants={fadeIn}
          className="flex justify-center gap-3 flex-wrap mt-16"
        >
          {statPills.map(({ strong, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-card text-sm text-foreground font-syne"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.55 + i * 0.07,
              }}
            >
              <strong className="text-primary font-syne font-bold">
                {strong}
              </strong>
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LandingHeroSection;
