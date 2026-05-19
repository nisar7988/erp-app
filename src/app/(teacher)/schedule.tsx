import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { useProfile } from "../../hooks/useStudentData";
import { useTeacherSchedule } from "../../hooks/useTeacherData";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";

const getDaysOfWeek = () => {
  const current = new Date();
  const day = current.getDay();
  // distance from Monday: if day is 0 (Sunday), it's -6. If day is 1 (Monday), it's 0. etc.
  const distanceToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((dayId, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      id: dayId,
      label: labels[index],
      date: date.getDate().toString(),
    };
  });
};

const getScheduleStatus = (startTimeStr?: string, endTimeStr?: string, dayOfWeek?: string) => {
  if (!startTimeStr || !endTimeStr || !dayOfWeek) {
    return { isOngoing: false, isUpcoming: false };
  }
  
  const now = new Date();
  
  const dayMap: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };
  
  const targetDay = dayMap[dayOfWeek.toUpperCase()];
  if (targetDay !== now.getDay()) {
    return { isOngoing: false, isUpcoming: false };
  }
  
  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);
  
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
  
  const isOngoing = nowMinutes >= startMinutes && nowMinutes <= endMinutes;
  // Upcoming if it starts in the next 60 minutes
  const isUpcoming = nowMinutes < startMinutes && (startMinutes - nowMinutes) <= 60;
  
  return { isOngoing, isUpcoming };
};

export default function TeacherScheduleScreen() {
  const DAYS = useMemo(() => getDaysOfWeek(), []);
  
  const currentDayIndex = new Date().getDay();
  const DAYS_OF_WEEK = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const defaultDay = DAYS_OF_WEEK[currentDayIndex] === "SUNDAY" ? "MONDAY" : DAYS_OF_WEEK[currentDayIndex];
  
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const teacherId = profile?.teacherProfile?.id;
  const { data: schedule = [], isLoading: isScheduleLoading } = useTeacherSchedule(teacherId);

  const filteredSchedule = useMemo(() => {
    return schedule
      .filter((item: any) => item.dayOfWeek === selectedDay)
      .map((item: any) => {
        const { isOngoing, isUpcoming } = getScheduleStatus(
          item.startTime,
          item.endTime,
          item.dayOfWeek
        );
        return { ...item, isOngoing, isUpcoming };
      });
  }, [schedule, selectedDay]);

  if (isProfileLoading || isScheduleLoading) {
    return <GlobalLoaderOverlay text="Loading Schedule..." />;
  }

  return (
    <ScreenWrapper padding={false}>
      <View className="px-6 mt-4">
        <Text className="text-2xl font-bold text-on-surface">Lecture Schedule</Text>
      </View>

      <View className="mt-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day.id}
              onPress={() => setSelectedDay(day.id)}
              className={`items-center justify-center w-14 h-20 rounded-3xl border ${
                selectedDay === day.id
                  ? "bg-primary border-primary shadow-lg shadow-primary/20"
                  : "bg-surface-dim border-outline"
              }`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${selectedDay === day.id ? "text-white/80" : "text-on-surface-variant"}`}
              >
                {day.label}
              </Text>
              <Text
                className={`text-lg font-bold mt-1 ${selectedDay === day.id ? "text-white" : "text-on-surface"}`}
              >
                {day.date}
              </Text>
              {selectedDay === day.id && (
                <View className="w-1 h-1 rounded-full bg-white mt-1" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6 mt-8" showsVerticalScrollIndicator={false}>
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item: any) => (
            <TimelineItem
              key={item.id}
              time={`${item.time} ${item.period}`}
              title={item.title}
              location={item.classRoom}
              classNameText={item.className}
              isOngoing={item.isOngoing}
              isUpcoming={item.isUpcoming}
            />
          ))
        ) : (
          <View className="items-center mt-20">
            <Text className="text-on-surface-variant">
              No lectures scheduled for today.
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

function TimelineItem({
  time,
  title,
  location,
  classNameText,
  isOngoing,
  isUpcoming,
}: any) {
  return (
    <View className="flex-row mb-6 h-32 shadow-sm ">
      <View className="items-center mr-4">
        <Text className="text-[10px] font-bold text-on-surface-variant uppercase w-16 text-right">
          {time}
        </Text>
        <View className="w-0.5 h-full bg-outline mt-2 relative items-center">
          <View
            className={`w-3 h-3 rounded-full border-2 border-surface ${isOngoing ? "bg-primary" : isUpcoming ? "bg-primary/40" : "bg-outline"}`}
          />
        </View>
      </View>
      <Card
        variant={isOngoing ? "primary" : "default"}
        className={`flex-1 p-4 ${isOngoing ? "bg-primary/5" : ""}`}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-base font-bold text-on-surface">{title}</Text>
            <View className="flex-row items-center gap-2 mt-2">
              <Ionicons name="school-outline" size={14} color="#78716C" />
              <Text className="text-xs text-on-surface-variant">
                Class: {classNameText}
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <Ionicons name="location-outline" size={14} color="#78716C" />
              <Text className="text-xs text-on-surface-variant">
                Room: {location}
              </Text>
            </View>
          </View>
          {isOngoing && (
            <View className="bg-primary px-2 py-1 rounded-lg">
              <Text className="text-[8px] font-bold text-white uppercase">
                Ongoing
              </Text>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
}
