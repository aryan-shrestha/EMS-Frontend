export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  user: number;
}

export * from "./Attendance";
export * from "./LeaveTrackerTypes";
export * from "./Noticeboard";
export * from "./SalaryTracker";
export * from "./SidebarTypes";
