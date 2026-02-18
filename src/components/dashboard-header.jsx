import { useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/theme-provider";
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  FilePlus2Icon,
  FilesIcon,
  MoonIcon,
  PackageIcon,
  SunIcon,
} from "lucide-react";
import { Switch } from "./ui/switch";

const ROUTE_TITLES = {
  "/invoices": { title: "Invoices", icon: FilesIcon },
  "/assets": { title: "Manage Assets", icon: PackageIcon },
  "/create/invoice": { title: "Create Invoice", icon: FilePlus2Icon },
};

const DEFAULT_TITLE = { title: "Create Invoice", icon: FilePlus2Icon };

function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    return ROUTE_TITLES[pathname] || DEFAULT_TITLE;
  }, [pathname]);

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

  return (
    <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 z-40">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-5"
        />
        <div className="size-8 shrink-0 bg-primary/20 rounded-[10px] text-primary flex items-center justify-center border border-primary/20">
          {<pageTitle.icon className="size-5" />}
        </div>
        <p className="sm:text-lg text-base font-semibold">{pageTitle.title}</p>
      </div>

      <Switch
        aria-label="Toggle dark mode"
        checked={isDarkMode}
        onCheckedChange={handleThemeToggle}
        checkedIcon={<MoonIcon className="size-2.5 text-muted-foreground" />}
        uncheckedIcon={<SunIcon className="size-2.5 text-muted-foreground" />}
      />
    </header>
  );
}

export default DashboardHeader;
