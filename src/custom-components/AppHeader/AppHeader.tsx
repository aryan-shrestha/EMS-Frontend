import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import AppBreadcrumb from "./AppBreadcrumb";

import AppNotification from "./AppNotification";

const AppHeader = () => {
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b py-4 bg-white/50 dark:bg-[#0A0A0A]/40 backdrop-blur-sm">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="-ml-1 cursor-pointer" size="icon" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBreadcrumb />
        </div>
        <div className="flex items-center">
          <AppNotification />
        </div>
      </header>
    </>
  );
};

export default AppHeader;
