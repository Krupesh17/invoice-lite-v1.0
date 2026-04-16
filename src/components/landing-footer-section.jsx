import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/motion/motion-variants";

function LandingFooterSection() {
  return (
    <motion.footer
      className="border-t border-theme py-4 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <p className="font-syne text-2xl font-semibold space-x-1 text-foreground">
        <span>Invoice</span>
        <sup className="text-xs font-normal text-muted-foreground">lite</sup>
      </p>

      <p className="text-muted-foreground text-sm">
        © 2026 InvoiceLite. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default LandingFooterSection;
