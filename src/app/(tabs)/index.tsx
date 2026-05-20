import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { ScheduleCard } from "../../components/dashboard/ScheduleCard";
import { useDashboard } from "../../hooks/useDashboard";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";

/**i
 * Premium Student Dashboard
 * Refactored to use modular architecture.
 */
export default function HomeScreen() {
  const {
    user,
    attendanceSummary,
    financeSummary,
    schedule,
    isLoading,
    navigateToAttendance,
    navigateToCalendar,
    navigateToFees,
  } = useDashboard();
  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Dashboard..." />;
  }

  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();
  return (
    <ScreenWrapper>
      {/* --- Header Section --- */}
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center gap-3">
          <Avatar source={{ uri: user.avatar }} size={40} />
          <Text className="text-lg font-bold text-on-surface">Dashboard</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-dim border border-outline">
          <Ionicons name="notifications-outline" size={20} color="#1C1917" />
        </TouchableOpacity>
      </View>

      {/* --- Greeting Section --- */}
      <View className="mt-8">
        <Text className="text-3xl font-bold text-on-surface">
          Morning, {user.name}!
        </Text>
        <Text className="text-on-surface-variant mt-1">
          {user.major} • {user.year} • {user.date}
        </Text>
      </View>

      {/* --- Stats Cards Section --- */}
      <View className="flex-row gap-4 mt-8">
        {/* Attendance Card */}
        <Card
          variant="dim"
          className="flex-1 py-16 items-center"
          onPress={navigateToAttendance}
        >
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4">
            ATTENDANCE
          </Text>
          <View className="relative items-center justify-center w-24 h-24">
            <View className="w-20 h-20 rounded-full border-8 border-outline/50 items-center justify-center">
              <View
                className="absolute w-20 h-20 rounded-full border-8 border-primary"
                style={{
                  borderLeftColor: "transparent",
                  borderBottomColor: "transparent",
                  transform: [{ rotate: "45deg" }],
                }}
              />
              <Text className="text-xl font-bold text-on-surface">
                {attendanceSummary.percentage}%
              </Text>
            </View>
          </View>
          <Text className="text-[10px] text-on-surface-variant mt-4">
            {attendanceSummary.targetMessage}
          </Text>
        </Card>

        {/* Finances Card */}
        <Card
          variant="primary"
          className="flex-1 justify-center items-center py-16 "
          onPress={navigateToFees}
        >
          {/* Decorative Glow */}
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full" />

          <Text className="text-[10px] font-bold text-white tracking-widest mb-4">
            FINANCES
          </Text>
          <View className="mb-4 items-center">
            <Text className="text-3xl font-bold text-white">
              Rs. {financeSummary.pendingAmount}
            </Text>
            <Text className="text-[10px] font-bold text-white mt-1">
              Pending Fees
            </Text>
          </View>

          {financeSummary.isFullyPaid && (
            <View className="flex-row items-center gap-1.5">
              <Ionicons
                name="checkmark-circle-outline"
                size={14}
                color="#E66C19"
              />
              <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tight">
                FULLY PAID
              </Text>
            </View>
          )}
        </Card>
      </View>

      {/* --- Schedule Section --- */}
      <View className="mt-10">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-on-surface">
            Today's Schedule
          </Text>
          <TouchableOpacity onPress={navigateToCalendar}>
            <Text className="text-xs font-bold text-primary uppercase">
              View Calendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Schedule List */}
        <View className="gap-3">
          {/* filter by today */}
          {schedule
            .filter((item: any) => item.dayOfWeek === today)
            .sort((a: any, b: any) => {
              return (
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
              );
            })
            .map((item: any) => (
              <ScheduleCard key={item.id} item={item} />
            ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
