import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const FILTERS = ["All Sessions", "Present", "Absent", "Late"];

/**
 * Premium Attendance History Screen
 * 
 * Features:
 * - Overall Attendance Summary Card
 * - Interactive Filter Buttons
 * - Detailed Attendance Records with Timeline
 */
export default function AttendanceScreen() {
  const [activeFilter, setActiveFilter] = useState("All Sessions");

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* --- Navigation Header --- */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-on-surface ml-2">Attendance History</Text>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* --- Summary Card --- */}
        <View className="mx-6 mt-4 bg-primary/5 border border-primary/10 rounded-[40px] p-8 items-center">
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
        </View>

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
            <AttendanceRecord 
              title="Advanced Mathematics II"
              status="Present"
              date="Today, Oct 25"
              time="09:00 AM"
              location="Professor Sterling's Hall • Room 402"
              isFirst
            />
            <AttendanceRecord 
              title="Theoretical Physics"
              status="Present"
              date="Today, Oct 25"
              time="11:30 AM"
              location="Laboratory Session • Science Wing B"
              isLast
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AttendanceRecord({ title, status, date, time, location, isFirst, isLast }: any) {
  return (
    <View className="flex-row">
      <View className="items-center mr-4">
        <View className={`w-10 h-10 rounded-full items-center justify-center bg-primary/10 border border-primary/20`}>
          <Ionicons name="checkmark" size={18} color="#E66C19" />
        </View>
        {!isLast && <View className="w-0.5 flex-1 bg-outline my-1" />}
      </View>
      
      <View className="flex-1 bg-surface border border-outline rounded-3xl p-5 mb-6 shadow-sm shadow-black/5">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-base font-bold text-on-surface flex-1 mr-2">{title}</Text>
          <View className="bg-success/10 px-2 py-1 rounded-lg">
            <Text className="text-[8px] font-bold text-success uppercase">{status}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="calendar-outline" size={12} color="#78716C" />
          <Text className="text-xs text-on-surface-variant">{date} • {time}</Text>
        </View>
        
        <Text className="text-[11px] text-on-surface-variant italic">{location}</Text>
      </View>
    </View>
  );
}
