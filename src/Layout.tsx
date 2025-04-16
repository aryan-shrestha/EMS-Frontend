import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./custom-components/AppSidebar/AppSidebar";

import AppHeader from "./custom-components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import React from "react";
import {
  Banknote,
  CircleCheckBig,
  CloudSnow,
  LayoutDashboardIcon,
  ListChecks,
  Megaphone,
  MessageCircleQuestion,
} from "lucide-react";
import { NotificationProvider } from "./context/NotificationContext";

const Layout: React.FC = () => {
  const [links, setLinks] = React.useState([
    {
      title: "Dashboard",
      url: "/",
      isActive: true,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Attendance",
      url: "/attendance",
      isActive: false,
      icon: CircleCheckBig,
    },
    {
      title: "Feedback",
      url: "/feedback",
      isActive: false,
      icon: MessageCircleQuestion,
    },
    {
      title: "Leave tracker",
      url: "/leave-tracker",
      isActive: false,
      icon: CloudSnow,
    },
    {
      title: "Noticeboard",
      url: "/noticeboard",
      isActive: false,
      icon: Megaphone,
    },
    {
      title: "Salary tracker",
      url: "/salary-tracker",
      isActive: false,
      icon: Banknote,
    },
    {
      title: "Task tracker",
      url: "#",
      isActive: false,
      icon: ListChecks,
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
    <NotificationProvider>
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
    </NotificationProvider>
  );
};

export default Layout;
