import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { useTeacherClasses } from "../../hooks/useTeacherData";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";
import { useRouter } from "expo-router";

export default function TeacherClassesScreen() {
  const router = useRouter();
  const { data: classes = [], isLoading } = useTeacherClasses();

  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Classes..." />;
  }

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* --- Header Section --- */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-black text-on-surface">My Classes</Text>
          <Text className="text-on-surface-variant mt-1">
            Select a class to manage attendance and view students
          </Text>
        </View>

        {/* --- Class Cards --- */}
        <View className="gap-4">
          {classes.length === 0 ? (
            <Card variant="dim" className="p-8 items-center justify-center">
              <Ionicons name="school-outline" size={40} color="#78716C" />
              <Text className="text-on-surface-variant font-semibold mt-3 text-center">
                You are not currently assigned to any classes.
              </Text>
            </Card>
          ) : (
            classes.map((schoolClass: any) => (
              <Card
                key={schoolClass.id}
                variant="dim"
                className="p-5 flex-row justify-between items-center border border-outline/55"
                onPress={() => router.push(`/class/${schoolClass.id}`)}
              >
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-primary/10 px-2.5 py-1 rounded-md">
                      <Text className="text-xs font-bold text-primary uppercase">
                        Active
                      </Text>
                    </View>
                    <Text className="text-xs text-on-surface-variant font-bold">
                      {schoolClass.academicYear?.year || "N/A"}
                    </Text>
                  </View>
                  <Text className="text-xl font-bold text-on-surface mt-2">
                    Class {schoolClass.name} - {schoolClass.section}
                  </Text>
                  <Text className="text-xs text-on-surface-variant mt-1">
                    Tap to mark attendance or view student details.
                  </Text>
                </View>
                <View className="w-10 h-10 items-center justify-center rounded-full bg-primary/10">
                  <Ionicons name="chevron-forward-outline" size={20} color="#E66C19" />
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
