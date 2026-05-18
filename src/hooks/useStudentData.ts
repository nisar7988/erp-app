import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';
import apiClient from '../services/apiClient';
import { ScheduleItem, AttendanceRecord } from '../types/dashboard';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getMe(),
  });
};

export const useAttendance = (userId?: string) => {
  return useQuery({
    queryKey: ['attendance', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/attendance/student/${userId}`);
      return response.data.data.data.map((record: any) => ({
        id: record.id,
        title: record.class?.name || 'Class',
        status: record.status.charAt(0) + record.status.slice(1).toLowerCase(),
        date: new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: '09:00 AM', // Backend might need to store time if needed, for now mock
        location: record.class?.name || 'Main Hall',
      })) as AttendanceRecord[];
    },
    enabled: !!userId,
  });
};

export const useSchedule = (classId?: string) => {
  return useQuery({
    queryKey: ['schedule', classId],
    queryFn: async () => {
      const response = await apiClient.get(`/schedule/class/${classId}`);
      return response.data.data.map((item: any) => {
        const start = new Date(item.startTime);
        const hours = start.getHours();
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = start.getMinutes().toString().padStart(2, '0');
        
        return {
          id: item.id,
          time: `${displayHours}:${displayMinutes}`,
          period,
          title: item.subject?.name || 'Subject',
          location: item.room || 'TBD',
          faculty: item.teacher?.user?.firstName || 'Faculty',
          isOngoing: false, // Logic for ongoing can be added based on current time
          isUpcoming: false,
        };
      }) as ScheduleItem[];
    },
    enabled: !!classId,
  });
};

export const useFees = (studentId?: string) => {
  return useQuery({
    queryKey: ['fees', studentId],
    queryFn: async () => {
      const response = await apiClient.get(`/fees/student-fees/student/${studentId}`);
      return response.data.data;
    },
    enabled: !!studentId,
  });
};
