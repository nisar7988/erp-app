import { ScheduleItem, AttendanceRecord } from "../types/dashboard";

export const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: "1",
    time: "09:00",
    period: "AM",
    title: "Advanced Algorithms",
    location: "Room 402, Block B",
    faculty: "Dr. Aris",
    isOngoing: true,
  },
  {
    id: "2",
    time: "11:30",
    period: "AM",
    title: "Machine Learning Lab",
    location: "Tech Center Lab 2",
    faculty: "Prof. Sarah",
    isUpcoming: true,
  },
  {
    id: "3",
    time: "02:00",
    period: "PM",
    title: "Ethics in AI",
    location: "Seminar Hall A",
    faculty: "Dr. James",
  },
];

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: "rec_1",
    title: "Advanced Mathematics II",
    status: "Present",
    date: "Today, Oct 25",
    time: "09:00 AM",
    location: "Professor Sterling's Hall • Room 402",
  },
  {
    id: "rec_2",
    title: "Theoretical Physics",
    status: "Present",
    date: "Today, Oct 25",
    time: "11:30 AM",
    location: "Laboratory Session • Science Wing B",
  },
];
