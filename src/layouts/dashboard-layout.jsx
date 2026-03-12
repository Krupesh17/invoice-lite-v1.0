import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "../components/dashboard-sidebar";
import DashboardHeader from "../components/dashboard-header";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="overflow-hidden">
        <DashboardHeader />
        <main className="w-full h-[calc(100dvh-64px)] overflow-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
