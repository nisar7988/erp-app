import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ['teacherClasses'],
    queryFn: async () => {
      const response = await apiClient.get('/teachers/classes');
      return response.data.data.data; // Paginated response data field contains list of classes
    },
  });
};

export const useClassDetails = (classId?: string) => {
  return useQuery({
    queryKey: ['classDetails', classId],
    queryFn: async () => {
      const response = await apiClient.get(`/classes/${classId}`);
      return response.data.data;
    },
    enabled: !!classId,
  });
};

export const useClassAttendance = (classId?: string, date?: string) => {
  return useQuery({
    queryKey: ['classAttendance', classId, date],
    queryFn: async () => {
      const response = await apiClient.get('/attendance', {
        params: { classId, date, limit: 1000 },
      });
      return response.data.data.data;
    },
    enabled: !!classId && !!date,
  });
};

export const useTeacherSchedule = (teacherId?: string) => {
  return useQuery({
    queryKey: ['teacherSchedule', teacherId],
    queryFn: async () => {
      const response = await apiClient.get(`/schedule/teacher/${teacherId}`);
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
          classRoom: item.room || 'TBD',
          className: `${item.class?.name}-${item.class?.section}` || 'Class',
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
        };
      });
    },
    enabled: !!teacherId,
  });
};

export const useSubmitBulkAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { classId: string; date: string; records: { studentId: string; status: string }[] }) => {
      const response = await apiClient.post('/attendance/bulk', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate class details to refresh UI if needed
      queryClient.invalidateQueries({ queryKey: ['classDetails', variables.classId] });
      queryClient.invalidateQueries({ queryKey: ['classAttendance', variables.classId, variables.date] });
    },
  });
};
