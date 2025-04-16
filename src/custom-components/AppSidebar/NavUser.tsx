import { useContext } from "react";
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/theme/ModeToggle";

import AuthContext from "@/context/AuthContext";

export function NavUser() {
  const { isMobile } = useSidebar();
  const auth = useContext(AuthContext);

  const getAvatarFallback = (
    first_name: string | undefined,
    last_name: string | undefined
  ): string => {
    if (first_name === undefined || last_name === undefined) {
      return "";
    } else {
      return `${first_name[0]}${last_name[0]}`;
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src=""
                  alt={`${auth?.user?.employee?.first_name} ${auth?.user?.employee?.last_name}`}
                />
                <AvatarFallback className="rounded-lg">
                  {getAvatarFallback(
                    auth?.user?.employee?.first_name,
                    auth?.user?.employee?.last_name
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold capitalize">
                  {`${auth?.user?.employee?.first_name} ${auth?.user?.employee?.last_name}`}
                </span>
                <span className="truncate text-xs">
                  {auth?.user?.employee?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={""}
                    alt={`${auth?.user?.employee?.first_name} ${auth?.user?.employee?.last_name}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getAvatarFallback(
                      auth?.user?.employee?.first_name,
                      auth?.user?.employee?.last_name
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold capitalize">
                    {`${auth?.user?.employee?.first_name} ${auth?.user?.employee?.last_name}`}
                  </span>
                  <span className="truncate text-xs">
                    {auth?.user?.employee?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ModeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => auth?.logout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
