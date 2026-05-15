import { router } from "expo-router";
import { MOCK_SCHEDULE } from "../constants/mockData";

export const useDashboard = () => {
  const user = {
    name: "Alex",
    major: "Computer Science",
    year: "Year 3",
    date: "Oct 23, 2023",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s",
  };

  const attendanceSummary = {
    percentage: 85,
    targetMessage: "Above 75% target",
  };

  const financeSummary = {
    pendingAmount: 0,
    isFullyPaid: true,
  };

  const schedule = MOCK_SCHEDULE;

  const navigateToAttendance = () => {
    router.push("/attendance");
  };

  const navigateToCalendar = () => {
    router.push("/schedule");
  };

  return {
    user,
    attendanceSummary,
    financeSummary,
    schedule,
    navigateToAttendance,
    navigateToCalendar,
  };
};
