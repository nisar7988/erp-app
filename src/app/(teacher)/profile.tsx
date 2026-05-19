import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";
import { authService } from "../../services/authService";
import { useProfile } from "../../hooks/useStudentData";
import GlobalLoaderOverlay from "../../components/common/GlobalLoaderOverlay";
import { useQueryClient } from "@tanstack/react-query";

export default function TeacherProfileScreen() {
  const router = useRouter();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const { data: profile, isLoading } = useProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    queryClient.clear();
    await authService.logout();
    router.replace("/(auth)");
  };

  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Profile..." />;
  }

  const teacherName = profile?.firstName ? `${profile.firstName} ${profile.lastName}` : "Teacher";
  const employeeId = profile?.teacherProfile?.employeeId || "N/A";
  const qualification = profile?.teacherProfile?.qualification || "N/A";
  const avatarUrl = profile?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s";

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-xl font-bold text-on-surface">Profile</Text>
        </View>

        <View className="items-center mt-8">
          <View className="relative">
            <Image
              source={{ uri: avatarUrl }}
              className="w-32 h-32 rounded-full bg-outline border-4 border-surface shadow-lg shadow-black/10"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-surface">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-6">
            <Text className="text-2xl font-bold text-on-surface">{teacherName}</Text>
            <Text className="text-on-surface-variant font-medium mt-1">ID: {employeeId}</Text>
            <Text className="text-on-surface-variant mt-0.5">{qualification}</Text>
          </View>
        </View>

        <View className="mt-10">
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">Account Settings</Text>
          <View className="bg-surface border border-outline rounded-[32px] overflow-hidden">
            <MenuItem icon="person-outline" label="Personal Info" onPress={() => router.push("/teacher-personal-info")} />
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
          onPress={() => setLogoutModalVisible(true)}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text className="text-error font-bold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmationModal
        visible={isLogoutModalVisible}
        title="Log Out"
        message="Are you sure you want to log out of your account? You will need to re-enter your credentials to access the portal."
        confirmText="Log Out"
        cancelText="Cancel"
        type="danger"
        icon="log-out-outline"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
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
