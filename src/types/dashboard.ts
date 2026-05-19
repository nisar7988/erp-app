export interface ScheduleItem {
  id: string;
  time: string;
  period: "AM" | "PM";
  title: string;
  location: string;
  faculty: string;
  isOngoing?: boolean;
  isUpcoming?: boolean;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
}

export interface FinanceSummary {
  totalOutstanding: number;
  paidAmount: number;
  dueDate: string;
  term: string;
}

export interface AttendanceSummary {
  percentage: number;
  status: string;
  message: string;
}

export interface AttendanceRecord {
  id: string;
  title: string;
  status: "Present" | "Absent" | "Late";
  date: string;
  time: string;
  location: string;
}
