import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { useProfile, useSchedule } from "../../hooks/useStudentData";

const DAYS = [
  { id: "MONDAY", label: "Mon", date: "23" },
  { id: "TUESDAY", label: "Tue", date: "24" },
  { id: "WEDNESDAY", label: "Wed", date: "25" },
  { id: "THURSDAY", label: "Thu", date: "26" },
  { id: "FRIDAY", label: "Fri", date: "27" },
  { id: "SATURDAY", label: "Sat", date: "28" },
];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState("MONDAY");

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const classId = profile?.studentProfile?.enrollments?.[0]?.classId;
  const { data: schedule = [], isLoading: isScheduleLoading } =
    useSchedule(classId);

  if (isProfileLoading || isScheduleLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#E66C19" />
          <Text className="mt-4 text-on-surface">Loading your schedule...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper padding={false}>
      <View className="px-6 mt-4">
        <Text className="text-2xl font-bold text-on-surface">My Schedule</Text>
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

      <ScrollView className="flex-1 px-6 mt-8">
        {schedule.length > 0 ? (
          schedule.map((item) => (
            <TimelineItem
              key={item.id}
              time={`${item.time} ${item.period}`}
              title={item.title}
              location={item.location}
              professor={item.faculty}
              isOngoing={item.isOngoing}
              isUpcoming={item.isUpcoming}
            />
          ))
        ) : (
          <View className="items-center mt-20">
            <Text className="text-on-surface-variant">
              No classes scheduled for today.
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
  professor,
  isOngoing,
  isUpcoming,
}: any) {
  return (
    <View className="flex-row mb-6">
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
              <Ionicons name="location-outline" size={14} color="#78716C" />
              <Text className="text-xs text-on-surface-variant">
                {location}
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <Ionicons name="person-outline" size={14} color="#78716C" />
              <Text className="text-xs text-on-surface-variant">
                {professor}
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
