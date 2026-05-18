import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

/**
 * Premium Profile Screen
 *
 * Features:
 * - Profile Header with Avatar and Bio
 * - Categorized Menu Options (Account, Preferences)
 * - Themed Menu Items with Icons
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#1C1917" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-on-surface">Profile</Text>
          <View className="w-10" />
        </View>

        <View className="items-center mt-8">
          <View className="relative">
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s",
              }}
              className="w-32 h-32 rounded-full bg-outline border-4 border-surface shadow-lg shadow-black/10"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-surface">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-6">
            <Text className="text-2xl font-bold text-on-surface">Alex Johnson</Text>
            <Text className="text-on-surface-variant font-medium mt-1">ID: 882941</Text>
            <Text className="text-on-surface-variant mt-0.5">Senior Product Designer</Text>
          </View>
        </View>

        <View className="mt-10">
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">Account Settings</Text>
          <View className="bg-surface border border-outline rounded-[32px] overflow-hidden">
            <MenuItem icon="person-outline" label="Personal Info" onPress={() => {}} />
            <MenuItem icon="notifications-outline" label="Notifications" onPress={() => {}} />
            <MenuItem icon="shield-checkmark-outline" label="Security" onPress={() => {}} isLast />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">Preference & Support</Text>
          <View className="bg-surface border border-outline rounded-[32px] overflow-hidden">
            <MenuItem icon="help-circle-outline" label="Support Center" onPress={() => {}} isLast />
          </View>
        </View>

        <TouchableOpacity
          className="mt-10 flex-row items-center justify-center gap-2 bg-error/5 py-4 rounded-3xl border border-error/10"
          onPress={() => router.replace("/(auth)")}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text className="text-error font-bold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

function MenuItem({ icon, label, onPress, isLast }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between p-5 ${!isLast ? "border-b border-outline/50" : ""}`}
    >
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 items-center justify-center rounded-2xl bg-primary/10">
          <Ionicons name={icon} size={20} color="#E66C19" />
        </View>
        <Text className="text-base font-semibold text-on-surface">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#78716C" />
    </TouchableOpacity>
  );
}
