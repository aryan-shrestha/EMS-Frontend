import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./custom-components/AppSidebar/AppSidebar";

import AppHeader from "./custom-components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { SidebarLink } from "./types/interfaces";
import { LayoutDashboard } from "lucide-react";
import React from "react";

const Layout: React.FC = () => {
  const [links, setLinks] = React.useState<SidebarLink[]>([
    {
      title: "Dashboard",
      url: "/admin",
      isActive: true,
      icon: LayoutDashboard,
    },
    {
      title: "Employees",
      url: "/admin/employees",
      isActive: true,
      icon: LayoutDashboard,
    },
    {
      title: "Attendance",
      url: "/admin/attendances",
      isActive: true,
      icon: LayoutDashboard,
    },
  ]);

  const handleNavClick = (clickedTitle: string) => {
    setLinks((prevNav) =>
      prevNav.map((item) => ({
        ...item,
        isActive: item.title === clickedTitle,
      }))
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar
        variant="sidebar"
        links={links}
        handleClick={handleNavClick}
      />
      <Toaster position="top-center" expand={true} />
      <main className="px-6 w-full">
        <AppHeader />
        <section className="py-6">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
