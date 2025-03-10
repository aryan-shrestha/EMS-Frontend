import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "@/axios/instance";

import { toast } from "sonner";
import { Notification } from "@/types/interfaces";

interface NotificationContextType {
  isLoading: boolean;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  fetchNotifications: () => Promise<void>;
  handleMarkedAsRead: (id: number) => Promise<void>;
}

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`notifications/my/`);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error occured while fetching notification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkedAsRead = async (id: number) => {
    try {
      await axios.patch(`notifications/my/${id}/`, {
        is_read: true,
      });
      setNotifications(notifications.filter((item) => item.id !== id));
      toast.success("Notification marked as read.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        isLoading,
        notifications,
        setNotifications,
        fetchNotifications,
        handleMarkedAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
