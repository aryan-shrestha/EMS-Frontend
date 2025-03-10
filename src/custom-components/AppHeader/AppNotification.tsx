import React, { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ListCheck, Loader2 } from "lucide-react";

import NotificationContext from "@/context/NotificationContext";

const AppNotification: React.FC = () => {
  const notificationContext = useContext(NotificationContext);

  return (
    <Sheet>
      <SheetTrigger>
        <Bell />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            You have{" "}
            <strong>{notificationContext?.notifications.length}</strong>{" "}
            notifications
          </SheetDescription>
        </SheetHeader>

        {notificationContext?.isLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader2 className="animate-spin"></Loader2>
          </div>
        ) : (
          <ScrollArea className={cn("h-screen p-4")}>
            {notificationContext?.notifications.length === 0 && (
              <div className="text-center">
                <small>You do not have any notifications</small>
              </div>
            )}
            {notificationContext?.notifications?.map((item) => {
              return (
                <div className="mb-4" key={item.id}>
                  <ContextMenu key={item.id}>
                    <ContextMenuTrigger className="flex flex-col justify-between p-4 min-h-20 w-full rounded-md border">
                      <span className="font-semibold">{item.title}</span>
                      <small>{item.created_at}</small>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem
                        inset
                        onClick={() => {
                          notificationContext.handleMarkedAsRead(item.id);
                        }}
                      >
                        Mark as read
                        <ContextMenuShortcut>
                          <ListCheck />
                        </ContextMenuShortcut>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AppNotification;
