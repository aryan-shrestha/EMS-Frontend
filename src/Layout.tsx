import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./custom-components/AppSidebar/AppSidebar";

import AppHeader from "./custom-components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <Toaster position="top-center" expand={true} />
      <main className="px-6 w-full">
        <AppHeader />
        <section className="py-6">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
