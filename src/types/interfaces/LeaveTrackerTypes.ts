export interface LeaveRequest {
  id: number;
  type: string;
  no_days: number;
  from_date: string;
  till_date: string;
  subject: string;
  reason_for_leave: string;
  is_approved: boolean;
  is_reviewed: boolean;
  is_paid: boolean;
  remarks: string;
  created_at: string;
}

export interface LeaveType {
  id: number;
  name: string;
  quota: number;
  organization: number;
}

export interface LeaveBalance {
  id: number;
  quota: number;
  leaves_taken: number;
  organization: number;
  employee: number;
  leave_type: LeaveType;
}
