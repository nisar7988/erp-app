import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { useProfile } from "../../hooks/useStudentData";
import {
  useTeacherSchedule,
  useTeacherClasses,
} from "../../hooks/useTeacherData";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";
import { useRouter } from "expo-router";
import { ScheduleItem } from "@/types/dashboard";

export default function TeacherHomeScreen() {
  const router = useRouter();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const teacherProfile = profile?.teacherProfile;
  const teacherId = teacherProfile?.id;

  const { data: schedule = [], isLoading: isScheduleLoading } =
    useTeacherSchedule(teacherId);
  const { data: classes = [], isLoading: isClassesLoading } =
    useTeacherClasses();

  if (isProfileLoading || isScheduleLoading || isClassesLoading) {
    return <GlobalLoaderOverlay text="Loading Teacher Dashboard..." />;
  }

  // Get current day of week (e.g., MONDAY)
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const currentDayIndex = new Date().getDay();
  const todayDayOfWeek = days[currentDayIndex];

  // Filter schedule for today
  const todaySchedule = schedule.filter(
    (item: any) => item.dayOfWeek === todayDayOfWeek,
  );

  const teacherName = profile?.firstName || "Teacher";
  const avatarUrl =
    profile?.profileImage ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s";

  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* --- Header Section --- */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center gap-3">
            <Avatar source={{ uri: avatarUrl }} size={40} />
            <Text className="text-lg font-bold text-on-surface">EduPortal</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-dim border border-outline">
            <Ionicons name="notifications-outline" size={20} color="#1C1917" />
          </TouchableOpacity>
        </View>

        {/* --- Greeting Section --- */}
        <View className="mt-8">
          <Text className="text-3xl font-bold text-on-surface">
            Welcome back, {teacherName}!
          </Text>
          <Text className="text-on-surface-variant mt-1">
            {teacherProfile?.qualification || "Faculty"} • {dateStr}
          </Text>
        </View>

        {/* --- Stats Cards Section --- */}
        <View className="flex-row gap-4 mt-8">
          {/* Total Classes Assigned */}
          <Card
            variant="dim"
            className="flex-1 py-6 items-center"
            onPress={() => router.push("/(teacher)/classes")}
          >
            <Ionicons
              name="people-outline"
              size={28}
              color="#E66C19"
              className="mb-2"
            />
            <Text className="text-2xl font-bold text-on-surface">
              {classes.length}
            </Text>
            <Text className="text-[10px] font-bold text-on-surface-variant tracking-wider mt-1">
              ASSIGNED CLASSES
            </Text>
          </Card>

          {/* Today's Lectures */}
          <Card
            variant="primary"
            className="flex-1 py-6 items-center"
            onPress={() => router.push("/(teacher)/schedule")}
          >
            <Ionicons
              name="calendar-outline"
              size={28}
              color="#FFFBF9"
              className="mb-2"
            />
            <Text className="text-2xl font-bold text-white">
              {todaySchedule.length}
            </Text>
            <Text className="text-[10px] font-bold text-white/80 tracking-wider mt-1">
              TODAY'S LECTURES
            </Text>
          </Card>
        </View>

        {/* --- Today's Schedule Section --- */}
        <View className="mt-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-on-surface">
              Today's Lectures
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(teacher)/schedule")}
            >
              <Text className="text-xs font-bold text-primary uppercase">
                View Weekly
              </Text>
            </TouchableOpacity>
          </View>

          {/* Schedule List */}
          <View className="gap-3">
            {todaySchedule.length === 0 ? (
              <Card variant="dim" className="p-6 items-center justify-center">
                <Ionicons
                  name="calendar-clear-outline"
                  size={32}
                  color="#78716C"
                />
                <Text className="text-on-surface-variant font-medium mt-2">
                  No lectures scheduled for today
                </Text>
              </Card>
            ) : (
              todaySchedule.map((item: any) => (
                <Card
                  key={item.id}
                  variant="dim"
                  className="p-4 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center gap-4">
                    <View className="bg-primary/10 p-3 rounded-xl items-center justify-center w-14 h-14">
                      <Text className="text-sm font-bold text-primary">
                        {item.time}
                      </Text>
                      <Text className="text-[10px] font-bold text-primary">
                        {item.period}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-base font-bold text-on-surface">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-on-surface-variant mt-1">
                        Room: {item.classRoom}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={16}
                    color="#78716C"
                  />
                </Card>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
