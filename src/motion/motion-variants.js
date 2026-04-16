export const spring = {
  type: "spring",
  stiffness: 60,
  damping: 20,
};

export const ease = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: ease,
  },
};

export const fadeUpFast = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: ease,
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: ease,
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: ease,
  },
};

export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const heroStagger = staggerContainer(0.12, 0);

export const cardStagger = staggerContainer(0.1, 0.1);

export const blobPulse = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export const navVariants = {
  top: {
    backdropFilter: "blur(0px)",
    borderBottomColor: "rgba(255,255,255,0)",
    backgroundColor: "rgba(0,0,0,0)",
  },
  scrolled: {
    backdropFilter: "blur(20px)",
    borderBottomColor: "var(--border)",
  },
};

export const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.75 },
      opacity: { duration: 0.01, delay: 0.75 },
    },
  },
};

export const glowVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.45,
    transition: {
      pathLength: { duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.72 },
      opacity: { duration: 0.01, delay: 0.72 },
    },
  },
};

export const viewportOnce = { once: true, amount: 0.15 };
