import React from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

export type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "primary" | "info";
  icon?: keyof typeof Ionicons.glyphMap;
};

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "primary",
  icon,
}: ConfirmationModalProps) {
  const isDanger = type === "danger";
  const isInfo = type === "info";

  let iconColor = Colors.primary;
  let iconBg = "bg-primary/10";
  let gradientColors = [Colors.primary, Colors.primaryVariant];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-surface w-full max-w-sm rounded-[32px] p-6 items-center shadow-2xl">
          {/* Icon Header */}
          {icon && (
            <View
              className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${iconBg}`}
            >
              <Ionicons name={icon} size={32} color={iconColor} />
            </View>
          )}

          {/* Text Content */}
          <Text className="text-xl font-bold text-on-surface text-center mb-2">
            {title}
          </Text>
          <Text className="text-sm text-on-surface-variant text-center mb-8 px-2 leading-5">
            {message}
          </Text>

          {/* Actions */}
          <View className="flex-row w-full gap-3 mt-2">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-4 rounded-[20px] bg-surface-dim items-center justify-center border border-outline/30"
            >
              <Text className="text-on-surface font-bold text-[15px]">
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm} className="flex-1">
              <LinearGradient
                colors={gradientColors as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 20,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: gradientColors[0],
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Text className="text-white font-bold text-[15px] tracking-wide">
                  {confirmText}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
