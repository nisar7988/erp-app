import { useRouter } from "expo-router";
import { useProfile, useAttendance, useSchedule, useFees } from "./useStudentData";

export const useDashboard = () => {
  const router = useRouter();
  
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  
  const studentProfile = profile?.studentProfile;
  const userId = profile?.id;
  const studentId = studentProfile?.id;
  const classId = studentProfile?.enrollments?.[0]?.classId;

  const { data: attendanceRecords, isLoading: isAttendanceLoading } = useAttendance(userId);
  const { data: schedule = [], isLoading: isScheduleLoading } = useSchedule(classId);
  const { data: fees = [], isLoading: isFeesLoading } = useFees(studentId);

  const user = {
    name: profile?.firstName || "Student",
    major: studentProfile?.enrollments?.[0]?.class?.name || "N/A",
    year: "Academic Year 2024", // Can be dynamic if backend has this
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    avatar: profile?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s",
  };

  const attendanceSummary = {
    percentage: 0,
    targetMessage: "No records yet",
  };

  if (attendanceRecords && attendanceRecords.length > 0) {
    const presentCount = attendanceRecords.filter((r: any) => r.status === 'Present').length;
    attendanceSummary.percentage = Math.round((presentCount / attendanceRecords.length) * 100);
    attendanceSummary.targetMessage = attendanceSummary.percentage >= 75 ? "Above 75% target" : "Below 75% target";
  }

  const pendingAmount = fees.reduce((acc: number, fee: any) => acc + Number(fee.pendingAmount), 0);
  const financeSummary = {
    pendingAmount,
    isFullyPaid: pendingAmount === 0,
  };

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
    isLoading: isProfileLoading || isAttendanceLoading || isScheduleLoading || isFeesLoading,
    navigateToAttendance,
    navigateToCalendar,
  };
};
