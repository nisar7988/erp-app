import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/layout/ScreenWrapper";
import { Card } from "../components/ui/Card";
import { AttendanceRecord } from "../components/dashboard/AttendanceRecord";
import { useProfile, useAttendance } from "../hooks/useStudentData";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";

const FILTERS = ["All Sessions", "Present", "Absent", "Late"];

export default function AttendanceScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Sessions");

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: records = [], isLoading: isRecordsLoading } = useAttendance(
    profile?.id,
  );

  const filteredRecords = records.filter((record) => {
    if (activeFilter === "All Sessions") return true;
    return record.status === activeFilter;
  });

  const presentCount = records.filter((r) => r.status === "Present").length;
  const overallPercentage =
    records.length > 0 ? Math.round((presentCount / records.length) * 100) : 0;

  if (isProfileLoading || isRecordsLoading) {
    return <GlobalLoaderOverlay text="Loading Attendance..." />;
  }

  return (
    <ScreenWrapper padding={false}>
      {/* --- Navigation Header --- */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-on-surface ml-2">
          Attendance History
        </Text>
      </View>

      {/* --- Summary Card --- */}
      <Card
        variant="primary"
        className="mx-6 mt-4 p-8 items-center border-primary/10 bg-primary/5"
      >
        <View className="relative items-center justify-center w-32 h-32 mb-6">
          <View className="w-28 h-28 rounded-full border-8 border-outline items-center justify-center">
            <View
              className="absolute w-28 h-28 rounded-full border-8 border-primary"
              style={{
                borderLeftColor: "transparent",
                borderBottomColor: "transparent",
                transform: [{ rotate: "45deg" }],
              }}
            />
            <View className="items-center">
              <Text className="text-3xl font-bold text-on-surface">
                {overallPercentage}%
              </Text>
              <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                Overall
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-xl font-bold text-on-surface text-center">
          {overallPercentage >= 90
            ? "Excellent Attendance"
            : overallPercentage >= 75
              ? "Good Attendance"
              : "Needs Improvement"}
        </Text>
        <Text className="text-sm text-on-surface-variant text-center mt-2 px-4 leading-5">
          {overallPercentage >= 75
            ? "You are consistently meeting the academic requirement. Great job!"
            : "Try to attend more sessions to meet the minimum requirement."}
        </Text>
      </Card>

      {/* --- Filter Section --- */}
      <View className="mt-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-5 py-3 rounded-2xl border ${
                activeFilter === filter
                  ? "bg-primary border-primary"
                  : "bg-surface-dim border-outline"
              }`}
            >
              <Text
                className={`text-xs font-bold ${activeFilter === filter ? "text-white" : "text-on-surface-variant"}`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- Recent Records --- */}
      <View className="mt-10 px-6">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-6 uppercase">
          {activeFilter === "All Sessions"
            ? "Recent Records"
            : `${activeFilter} Sessions`}
        </Text>

        <View className="pb-10">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <AttendanceRecord
                key={record.id}
                record={record}
                isLast={index === filteredRecords.length - 1}
              />
            ))
          ) : (
            <Text className="text-sm text-on-surface-variant text-center mt-10">
              No records found for this filter.
            </Text>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
