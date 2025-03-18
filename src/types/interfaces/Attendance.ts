export interface CheckInOut {
  id: number;
  attendance: number;
  check_in?: string | null;
  check_out?: string | null;
}

export interface TotalWorkingHours {
  duration: string;
  percentage: number;
}

export interface Attendance {
  id: number;
  check_ins_outs: CheckInOut[];
  total_working_hours: TotalWorkingHours;
  date: string;
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
