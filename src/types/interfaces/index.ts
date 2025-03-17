export interface CheckInOut {
  id: number;
  attendance: number;
  check_in?: string | null;
  check_out?: string | null;
}

export interface TotalWorkingHours {
  duration: string; // Example: "4 Hrs 9 Mins"
  percentage: number; // Example: 56
}

export interface Attendance {
  id: number;
  check_ins_outs: CheckInOut[];
  total_working_hours: TotalWorkingHours; // Example: "0 hours 0 minutes"
  date: string; // Example: "2081-11-20" (Nepali date as a string)
  is_remote: boolean;
  check_in_lat?: string | null;
  check_in_lng?: string | null;
  check_out_lat?: string | null;
  check_out_lng?: string | null;
  organization: number;
  employee: number;
}

interface AttendanceMonthData {
  [key: string]: number; // This will allow any string as a key (e.g., month name), with a numeric value
}

export interface AttendanceYearData {
  year: number;
  data: AttendanceMonthData[];
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  user: number;
}
