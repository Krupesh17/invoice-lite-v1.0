import { motion } from "framer-motion";
import { scaleIn, viewportOnce } from "@/motion/motion-variants";
import {
  FilePlus2Icon,
  FilesIcon,
  PanelLeftIcon,
  ShieldIcon,
  SlidersHorizontalIcon,
  ToolCaseIcon,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import LandingDashboardPreviewSectionTable from "./landing-dashboard-preview-section-table";

const sidebarMenu = {
  navMain: [
    {
      title: "Create",
      items: [
        {
          icon: FilePlus2Icon,
          label: "Create Invoice",
        },
      ],
    },
    {
      title: "Navigation",
      items: [
        {
          icon: FilesIcon,
          label: "Invoices",
        },
        {
          icon: ToolCaseIcon,
          label: "Manage Assets",
        },
      ],
    },
  ],
};

function LandingDashboardPreviewSection() {
  return (
    <div className="relative z-10 px-6 md:px-12 pb-24">
      <motion.div
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden border shadow-[0_24px_80px_rgba(0,0,0,0.08),0_0_80px_rgba(255,96,0,0.2)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_80px_rgba(255,96,0,0.2)]"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Browser chrome bar */}
        <div className="bg-accent dark:bg-accent/40 px-5 py-3.5 flex items-center gap-3 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="h-7 max-w-70 flex-1 rounded-md bg-input dark:bg-input/40 flex items-center px-3 gap-1.5">
            <ShieldIcon size={10} />
            <span className="text-[0.7rem] truncate">
              invoicelite.app/invoices
            </span>
          </div>
        </div>

        {/* App body */}
        <div className="bg-theme2 h-115 grid md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <div className="hidden md:block bg-sidebar border-r">
            <div className="h-16 flex items-center gap-2 font-syne font-extrabold text-primary text-sm px-4">
              <img src="/assets/invoice-lite-logo.svg" />
              <p className="font-syne text-2xl font-semibold space-x-1 text-foreground">
                <span>Invoice</span>
                <sup className="text-xs font-normal text-muted-foreground">
                  lite
                </sup>
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4">
              {sidebarMenu?.navMain?.map((item) => (
                <div className="flex flex-col" key={item?.title}>
                  <p className="h-8 px-2 flex items-center text-xs text-muted-foreground/60 font-normal">
                    {item.title}
                  </p>
                  <div className="flex flex-col gap-1">
                    {item.items.map((item) => {
                      const active = item?.label === "Invoices";
                      return (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 h-8 px-2 rounded-lg text-sm cursor-default ${
                            active
                              ? "bg-accent text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          <item.icon size={16} />
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="overflow-hidden bg-background">
            {/* Nav */}
            <nav className="h-16 px-4 flex items-center justify-between gap-2 border-b">
              <div className="flex items-center gap-2">
                <div className="size-7 flex items-center justify-center text-foreground rounded-lg">
                  <PanelLeftIcon className="size-4" />
                </div>
                <div className="h-6 border border-l mr-2"></div>
                <div className="size-8 flex items-center justify-center text-primary bg-primary/20 border border-primary/20 rounded-lg">
                  <FilesIcon className="size-4" />
                </div>
                <p className="sm:text-lg text-base font-medium">Invoices</p>
              </div>
            </nav>

            {/* Table Section */}
            <section className="p-4 space-y-4">
              <div className="h-8 px-2.5 inline-flex items-center gap-2 text-sm bg-secondary rounded-lg">
                <SlidersHorizontalIcon className="size-4" />
                <span>Filter</span>
              </div>

              {/* Table */}
              <ScrollArea className="border rounded-xl overflow-x-auto">
                <LandingDashboardPreviewSectionTable />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <div className="w-full flex items-center justify-between gap-2 max-[370px]:flex-col max-[370px]:gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {["Page", "1", "of", "1", "•", "2", "Records"]?.map(
                    (item, index) => {
                      const isOdd = index % 2 !== 0;
                      return (
                        <span
                          key={index}
                          className={`${isOdd && "text-foreground"}`}
                        >
                          {item}
                        </span>
                      );
                    },
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {["Previous", "Next"]?.map((item, index) => (
                    <div
                      key={index}
                      className="h-8 px-2.5 inline-flex items-center gap-2 text-sm border text-muted-foreground bg-secondary/20 rounded-lg"
                    >
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingDashboardPreviewSection;
