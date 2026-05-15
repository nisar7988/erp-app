import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

/**
 * Premium Student Dashboard
 *
 * Features:
 * - Header with User Profile and Notifications
 * - Personalized Greeting
 * - Key Stats (Attendance & Finances)
 * - Today's Schedule with Class Details
 */
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* --- Header Section --- */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center gap-3">
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
              }}
              className="w-10 h-10 rounded-full bg-outline"
            />
            <Text className="text-lg font-bold text-on-surface">Dashboard</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-dim border border-outline">
            <Ionicons name="notifications-outline" size={20} color="#1C1917" />
          </TouchableOpacity>
        </View>

        {/* --- Greeting Section --- */}
        <View className="mt-8">
          <Text className="text-3xl font-bold text-on-surface">
            Morning, Alex!
          </Text>
          <Text className="text-on-surface-variant mt-1">
            Computer Science • Year 3 • Oct 23, 2023
          </Text>
        </View>

        {/* --- Stats Cards Section --- */}
        <View className="flex-row gap-4 mt-8">
          {/* Attendance Card */}
          <TouchableOpacity
            className="flex-1 bg-surface-dim p-4 rounded-3xl border border-outline items-center"
            onPress={() => router.push("/attendance")}
          >
            <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4">
              ATTENDANCE
            </Text>
            <View className="relative items-center justify-center w-24 h-24">
              <View className="w-20 h-20 rounded-full border-8 border-outline items-center justify-center">
                <View
                  className="absolute w-20 h-20 rounded-full border-8 border-primary"
                  style={{
                    borderLeftColor: "transparent",
                    borderBottomColor: "transparent",
                    transform: [{ rotate: "45deg" }],
                  }}
                />
                <Text className="text-xl font-bold text-on-surface">85%</Text>
              </View>
            </View>
            <Text className="text-[10px] text-on-surface-variant mt-4">
              Above 75% target
            </Text>
          </TouchableOpacity>

          {/* Finances Card */}
          <View className="flex-1 bg-outline p-4 rounded-3xl border border-primary/20">
            <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4">
              FINANCES
            </Text>
            <View className="mb-4">
              <Text className="text-2xl font-bold text-on-surface">$0.00</Text>
              <Text className="text-[10px] text-on-surface-variant">
                Pending Fees
              </Text>
            </View>
            <View className="flex-row items-center gap-1 bg-success/10 self-start px-2 py-1 rounded-full">
              <Ionicons name="checkmark-circle" size={12} color="#16A34A" />
              <Text className="text-[10px] font-bold text-success">
                FULLY PAID
              </Text>
            </View>
          </View>
        </View>

        {/* --- Schedule Section --- */}
        <View className="mt-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-on-surface">
              Today's Schedule
            </Text>
            <TouchableOpacity>
              <Text className="text-xs font-bold text-primary uppercase">
                View Calendar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Schedule List */}
          <View className="gap-3">
            <ScheduleCard
              time="09:00"
              period="AM"
              title="Advanced Algorithms"
              location="Room 402, Block B"
              faculty="Dr. Aris"
            />
            <ScheduleCard
              time="11:30"
              period="AM"
              title="Machine Learning Lab"
              location="Tech Center Lab 2"
              faculty="Prof. Sarah"
            />
            <ScheduleCard
              time="02:00"
              period="PM"
              title="Ethics in AI"
              location="Seminar Hall A"
              faculty="Dr. James"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ScheduleCard({ time, period, title, location, faculty }: any) {
  return (
    <View className="flex-row bg-surface border border-outline rounded-2xl overflow-hidden shadow-sm shadow-black/5">
      <View className="w-1.5 bg-primary" />
      <View className="flex-1 p-4 flex-row items-center">
        <View className="items-center pr-4 border-r border-outline">
          <Text className="text-sm font-bold text-on-surface">{time}</Text>
          <Text className="text-[10px] font-bold text-on-surface-variant">
            {period}
          </Text>
        </View>
        <View className="pl-4 flex-1">
          <Text className="text-sm font-bold text-on-surface" numberOfLines={1}>
            {title}
          </Text>
          <View className="flex-row items-center gap-3 mt-1">
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={10} color="#78716C" />
              <Text className="text-[10px] text-on-surface-variant">
                {location}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="person-outline" size={10} color="#78716C" />
              <Text className="text-[10px] text-on-surface-variant">
                {faculty}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={16} color="#78716C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
