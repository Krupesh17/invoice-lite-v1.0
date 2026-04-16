import { motion } from "framer-motion";
import { scaleIn, viewportOnce } from "@/motion/motion-variants";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { ArrowRightIcon } from "lucide-react";

function LandingCallToActionSection() {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => navigate("/create/invoice"), []);

  return (
    <section className="px-6 md:px-12 py-24 relative z-10 text-center">
      <motion.div
        className="flex flex-col px-8 py-12 max-w-2xl mx-auto bg-card border rounded-4xl relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Orange glow */}
        <div className="absolute pointer-events-none top-0 left-2/4 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-[radial-gradient(circle,rgba(255,96,0,0.2)_0%,transparent_65%)]" />

        <h2
          className="font-syne font-extrabold text-foreground tracking-tight mb-4 relative z-10"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Start generating invoices today.
        </h2>
        <p className="text-muted-foreground text-lg mb-9 relative z-10">
          No credit card. No complicated setup. Just open the app and go.
        </p>

        <motion.div
          className="relative z-10 inline-block rounded-full hover:shadow-primary/30"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            className="group font-syne h-14 px-8! rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,96,0,0.35)]"
            onClick={handleNavigation}
          >
            <span>Open Dashboard</span>
            <ArrowRightIcon
              strokeWidth={2.5}
              className="size-5 group-hover:ml-1 transition-all ease-in-out"
            />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LandingCallToActionSection;
