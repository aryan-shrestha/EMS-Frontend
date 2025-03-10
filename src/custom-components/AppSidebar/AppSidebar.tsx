import * as React from "react";
import { Link } from "react-router";

import { VersionSwitcher } from "./NavHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Banknote,
  CircleCheckBig,
  CloudSnow,
  LayoutDashboardIcon,
  ListChecks,
  Megaphone,
  MessageCircleQuestion,
} from "lucide-react";
import { NavUser } from "./NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navMain, setnavMain] = React.useState([
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
      url: "#",
      isActive: false,
      icon: Megaphone,
    },
    {
      title: "Salary tracker",
      url: "#",
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
    setnavMain((prevNav) =>
      prevNav.map((item) => ({
        ...item,
        isActive: item.title === clickedTitle,
      }))
    );
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="py-2">
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="py-6"
                    onClick={() => {
                      handleNavClick(item.title);
                    }}
                  >
                    <Link to={item.url} className="py-5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
