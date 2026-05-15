import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AttendanceRecord as AttendanceRecordType } from "../../types/dashboard";
import { Badge } from "../ui/Badge";

interface AttendanceRecordProps {
  record: AttendanceRecordType;
  isLast?: boolean;
}

export const AttendanceRecord = ({ record, isLast }: AttendanceRecordProps) => {
  return (
    <View className="flex-row">
      <View className="items-center mr-4">
        <View className="w-10 h-10 rounded-full items-center justify-center bg-primary/10 border border-primary/20">
          <Ionicons name="checkmark" size={18} color="#E66C19" />
        </View>
        {!isLast && <View className="w-0.5 flex-1 bg-outline my-1" />}
      </View>
      
      <View className="flex-1 bg-surface border border-outline rounded-3xl p-5 mb-6 shadow-sm shadow-black/5">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-base font-bold text-on-surface flex-1 mr-2">{record.title}</Text>
          <Badge label={record.status} variant="success" />
        </View>
        
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="calendar-outline" size={12} color="#78716C" />
          <Text className="text-xs text-on-surface-variant">{record.date} • {record.time}</Text>
        </View>
        
        <Text className="text-[11px] text-on-surface-variant italic">{record.location}</Text>
      </View>
    </View>
  );
};
