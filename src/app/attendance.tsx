import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScreenWrapper } from "../components/layout/ScreenWrapper";
import { Card } from "../components/ui/Card";
import { AttendanceRecord } from "../components/dashboard/AttendanceRecord";
import { MOCK_ATTENDANCE_RECORDS } from "../constants/mockData";

const FILTERS = ["All Sessions", "Present", "Absent", "Late"];

/**
 * Premium Attendance History Screen
 * Refactored to use modular architecture.
 */
export default function AttendanceScreen() {
  const [activeFilter, setActiveFilter] = useState("All Sessions");

  return (
    <ScreenWrapper padding={false}>
      {/* --- Navigation Header --- */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-on-surface ml-2">Attendance History</Text>
      </View>

      {/* --- Summary Card --- */}
      <Card variant="primary" className="mx-6 mt-4 p-8 items-center border-primary/10 bg-primary/5">
        <View className="relative items-center justify-center w-32 h-32 mb-6">
          <View className="w-28 h-28 rounded-full border-8 border-outline items-center justify-center">
            <View 
              className="absolute w-28 h-28 rounded-full border-8 border-primary" 
              style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: [{ rotate: '45deg' }] }}
            />
            <View className="items-center">
              <Text className="text-3xl font-bold text-on-surface">94%</Text>
              <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Overall</Text>
            </View>
          </View>
        </View>
        
        <Text className="text-xl font-bold text-on-surface text-center">Excellent Attendance</Text>
        <Text className="text-sm text-on-surface-variant text-center mt-2 px-4 leading-5">
          You are consistently exceeding the 90% academic requirement. Great job!
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
                  ? 'bg-primary border-primary' 
                  : 'bg-surface-dim border-outline'
              }`}
            >
              <Text className={`text-xs font-bold ${activeFilter === filter ? 'text-white' : 'text-on-surface-variant'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- Recent Records --- */}
      <View className="mt-10 px-6">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-6 uppercase">Recent Records</Text>
        
        <View>
          {MOCK_ATTENDANCE_RECORDS.map((record, index) => (
            <AttendanceRecord 
              key={record.id} 
              record={record} 
              isLast={index === MOCK_ATTENDANCE_RECORDS.length - 1} 
            />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
