import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScheduleItem } from "../../types/dashboard";

interface ScheduleCardProps {
  item: ScheduleItem;
}

export const ScheduleCard = ({ item }: ScheduleCardProps) => {
  return (
    <View className="flex-row bg-surface border border-outline rounded-2xl overflow-hidden shadow-sm shadow-black/5">
      <View className="w-1.5 bg-primary" />
      <View className="flex-1 p-4 flex-row items-center">
        <View className="items-center pr-4 border-r border-outline">
          <Text className="text-sm font-bold text-on-surface">{item.time}</Text>
          <Text className="text-[10px] font-bold text-on-surface-variant">{item.period}</Text>
        </View>
        <View className="pl-4 flex-1">
          <Text className="text-sm font-bold text-on-surface" numberOfLines={1}>{item.title}</Text>
          <View className="flex-row items-center gap-3 mt-1">
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={10} color="#78716C" />
              <Text className="text-[10px] text-on-surface-variant">{item.location}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="person-outline" size={10} color="#78716C" />
              <Text className="text-[10px] text-on-surface-variant">{item.faculty}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={16} color="#78716C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
