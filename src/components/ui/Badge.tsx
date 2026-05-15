import React from "react";
import { View, Text } from "react-native";

type BadgeVariant = "success" | "primary" | "surface" | "error" | "warning";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success/10 text-success border-success/10",
  primary: "bg-primary/10 text-primary border-primary/10",
  surface: "bg-surface-dim text-on-surface-variant border-outline",
  error: "bg-error/10 text-error border-error/10",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
};

export const Badge = ({ label, variant = "surface", className = "" }: BadgeProps) => {
  return (
    <View className={`px-2 py-1 rounded-lg border ${variantStyles[variant].split(' ')[0]} ${variantStyles[variant].split(' ')[2]} ${className}`}>
      <Text className={`text-[8px] font-bold uppercase tracking-tight ${variantStyles[variant].split(' ')[1]}`}>
        {label}
      </Text>
    </View>
  );
};
