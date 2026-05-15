import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const DAYS = [
  { id: 1, label: "Mon", date: "23" },
  { id: 2, label: "Tue", date: "24" },
  { id: 3, label: "Wed", date: "25" },
  { id: 4, label: "Thu", date: "26" },
  { id: 5, label: "Fri", date: "27" },
  { id: 6, label: "Sat", date: "28" },
];

/**
 * Premium Schedule Screen
 *
 * Features:
 * - Weekly Day Selector
 * - Detailed Timeline with Class Cards
 * - Status Badges (Ongoing, Upcoming)
 */
export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 mt-4">
        <Text className="text-2xl font-bold text-on-surface">My Schedule</Text>
      </View>

      {/* --- Day Selector --- */}
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

      {/* --- Timeline Content --- */}
      <ScrollView
        className="flex-1 px-6 mt-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <TimelineItem
          time="09:00 AM"
          title="Advanced Algorithms"
          location="Room 402, Block B"
          professor="Dr. Aris"
          isOngoing
        />
        <TimelineItem
          time="11:30 AM"
          title="Machine Learning Lab"
          location="Tech Center Lab 2"
          professor="Prof. Sarah"
          isUpcoming
        />
        <TimelineItem
          time="02:00 PM"
          title="Ethics in AI"
          location="Seminar Hall A"
          professor="Dr. James"
        />
        <TimelineItem
          time="04:30 PM"
          title="Compiler Design"
          location="Lecture Hall 3"
          professor="Dr. Robert"
        />
      </ScrollView>
    </SafeAreaView>
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
        <View className="w-0.5  bg-outline mt-2 relative items-center">
          <View
            className={`w-3 h-3 rounded-full border-2 border-surface ${isOngoing ? "bg-primary" : isUpcoming ? "bg-primary/40" : "bg-outline"}`}
          />
        </View>
      </View>

      <View
        className={`flex-1 p-4 rounded-3xl border ${isOngoing ? "bg-primary/5 border-primary/20 shadow-sm shadow-primary/5" : "bg-surface border-outline"}`}
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
      </View>
    </View>
  );
}
