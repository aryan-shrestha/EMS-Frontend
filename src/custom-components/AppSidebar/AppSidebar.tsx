import * as React from "react";
import { Link, useLocation } from "react-router";

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

import { NavUser } from "./NavUser";
import { SidebarLink } from "@/types/interfaces";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  links: SidebarLink[];
  handleClick: (title: string) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  links,
  handleClick,
  ...props
}) => {
  const location = useLocation();

  React.useEffect(() => {
    let link = links.find((link) => link.url == location.pathname);
    link !== undefined && handleClick(link.title);
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="py-6"
                    onClick={() => {
                      handleClick(item.title);
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
};

export default AppSidebar;
