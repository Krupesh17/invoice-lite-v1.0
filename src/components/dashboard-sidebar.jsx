import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { FilePlus2Icon, FilesIcon, ToolCaseIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const data = {
  navMain: [
    {
      title: "Create",
      items: [
        {
          icon: <FilePlus2Icon />,
          label: "Create Invoice",
          path: "/create/invoice",
        },
      ],
    },
    {
      title: "Navigation",
      items: [
        {
          icon: <FilesIcon />,
          label: "Invoices",
          path: "/invoices",
        },
        {
          icon: <ToolCaseIcon />,
          label: "Manage Assets",
          path: "/assets",
        },
      ],
    },
  ],
};

function DashboardSidebar({ ...props }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const handleNavigation = (path) => {
    if (path === "/create/invoice") {
    }
    navigate(path);
    setOpenMobile(false);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4 py-3.5">
        <div className="flex items-center gap-2 h-9">
          <img src="/assets/invoice-lite-logo.svg" />
          <h2 className="text-2xl font-semibold space-x-1 text-foreground">
            <span>Invoice</span>
            <sup className="text-xs font-normal text-muted-foreground">
              lite
            </sup>
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup className="px-4" key={item.title}>
            <SidebarGroupLabel
              className={"text-muted-foreground/60 font-normal"}
            >
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.path)}
                      isActive={pathname === item.path}
                      className="text-muted-foreground"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="bg-sidebar-accent p-4 rounded-xl space-y-3 border border-sidebar-border">
          <div className="space-y-1">
            <h4 className="text-base font-semibold">Login</h4>
            <p className="text-xs text-muted-foreground">
              Login to your account to save your data and access your data
              anytime, anywhere
            </p>
          </div>
          <Button type="button" size="xs">
            Login
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
