import { useTheme } from "@/contexts/theme-provider";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { ArrowRightIcon, MoonIcon, SunIcon } from "lucide-react";

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();

  const isDarkMode = useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);

  const handleThemeToggle = useCallback(
    (checked) => {
      setTheme(checked ? "dark" : "light");
    },
    [setTheme],
  );

  const handleNavigation = useCallback(() => navigate("/create/invoice"), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-12 border-b"
      animate={{
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottomColor: scrolled ? "var(--border)" : "transparent",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--landing-background) 80%, transparent)"
          : "transparent",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline font-semibold text-[1.15rem] tracking-tight text-foreground"
        >
          <img src="/assets/invoice-lite-logo.svg" />
          <p className="font-syne text-2xl font-semibold space-x-1 text-foreground">
            <span>Invoice</span>
            <sup className="text-xs font-normal text-muted-foreground">
              lite
            </sup>
          </p>
        </Link>
      </motion.div>

      {/* Right side */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <Switch
          aria-label="Toggle dark mode"
          checked={isDarkMode}
          onCheckedChange={handleThemeToggle}
          checkedIcon={<MoonIcon className="size-2.5 text-muted-foreground" />}
          uncheckedIcon={<SunIcon className="size-2.5 text-muted-foreground" />}
        />

        <Button
          type="button"
          variant="outline"
          className="group font-syne max-md:hidden hover:scale-105 hover:shadow-[0_4px_30px_rgba(255,96,0,0.35)] hover:border-primary/80!"
          onClick={handleNavigation}
        >
          <span>Invoice It</span>
          <ArrowRightIcon className="group-hover:-rotate-45 transition-discrete duration-300 ease-in-out" />
        </Button>
      </motion.div>
    </motion.nav>
  );
}

export default LandingNavbar;
