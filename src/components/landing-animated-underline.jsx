import { drawVariants, glowVariants } from "@/motion/motion-variants";
import { motion } from "framer-motion";

function LandingAnimatedUnderline() {
  const path =
    "M2,8 C20,2 45,14 72,6 C99,-2 125,12 152,5 C179,-2 205,11 232,5 C259,-1 278,9 296,6";

  return (
    <span
      aria-hidden="true"
      className="absolute left-0 right-0 pointer-events-none"
      style={{ bottom: "-10px", height: "20px" }}
    >
      <svg
        viewBox="0 0 298 20"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={path}
          stroke="#FF6000"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#squiggle-blur)"
          variants={glowVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d={path}
          stroke="#FF6000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawVariants}
          initial="hidden"
          animate="visible"
        />

        <defs>
          <filter
            id="squiggle-blur"
            x="-20%"
            y="-100%"
            width="140%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}

export default LandingAnimatedUnderline;
