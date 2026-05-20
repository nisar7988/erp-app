import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AttendanceRecord as AttendanceRecordType } from "../../types/dashboard";
import { Badge } from "../ui/Badge";

interface AttendanceRecordProps {
  record: AttendanceRecordType;
  isLast?: boolean;
}

const STATUS_ICON: Record<
  string,
  { name: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
  Absent: { name: "close", color: "#EF4444", bg: "bg-red-50 border-red-100" },
  Late: {
    name: "time-outline",
    color: "#F59E0B",
    bg: "bg-amber-50 border-amber-100",
  },
  Present: {
    name: "checkmark",
    color: "#22C55E",
    bg: "bg-green-50 border-green-100",
  },
};

export const AttendanceRecord = ({ record, isLast }: AttendanceRecordProps) => {
  const iconConfig = STATUS_ICON[record.status] ?? STATUS_ICON.Present;

  const badgeVariant =
    record.status === "Absent"
      ? "error"
      : record.status === "Late"
        ? "warning"
        : "success";

  return (
    <View className="flex-row">
      {/* ── Timeline spine ── */}
      <View className="items-center mr-4 shadow-sm">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center border ${iconConfig.bg} `}
        >
          <Ionicons name={iconConfig.name} size={18} color={iconConfig.color} />
        </View>
        {!isLast && <View className="w-0.5 flex-1 bg-outline my-1" />}
      </View>

      {/* ── Card ── */}
      <View className="flex-1 bg-surface  border border-outline rounded-3xl p-5 mb-6 shadow-sm">
        {/* Status + date row */}
        <View className="flex-row justify-between items-center mb-4">
          <Badge label={record.status} variant={badgeVariant} />
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="calendar-outline" size={13} color="#78716C" />
            <Text className="text-xs text-on-surface-variant font-medium">
              {record.date}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-outline mb-4" />

        {/* Time + teacher row */}
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="time-outline" size={13} color="#78716C" />
          <Text className="text-xs text-on-surface-variant">{record.time}</Text>
        </View>
      </View>
    </View>
  );
};
