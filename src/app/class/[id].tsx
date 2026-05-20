import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { Avatar } from "../../components/ui/Avatar";
import {
  useClassDetails,
  useSubmitBulkAttendance,
} from "../../hooks/useTeacherData";
import GlobalLoaderOverlay from "@/components/common/GlobalLoaderOverlay";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function ClassAttendanceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: classDetails, isLoading } = useClassDetails(id);
  const submitBulkAttendance = useSubmitBulkAttendance();

  // Local state for attendance: Map of studentId -> AttendanceStatus ('PRESENT' | 'ABSENT' | 'LATE')
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, "PRESENT" | "ABSENT" | "LATE">
  >({});
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  // When class details are loaded, default all students to PRESENT
  useEffect(() => {
    if (classDetails?.students) {
      const initialMap: Record<string, "PRESENT" | "ABSENT" | "LATE"> = {};
      classDetails.students.forEach((enrollment: any) => {
        const sId = enrollment.student?.id;
        if (sId) {
          initialMap[sId] = "PRESENT";
        }
      });
      setAttendanceMap(initialMap);
    }
  }, [classDetails]);

  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Class Details..." />;
  }

  if (!classDetails) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-on-surface-variant font-bold text-lg">
            Class not found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-primary px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const students = classDetails.students || [];

  const handleStatusChange = (
    studentId: string,
    status: "PRESENT" | "ABSENT" | "LATE",
  ) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAll = (status: "PRESENT" | "ABSENT" | "LATE") => {
    const updatedMap = { ...attendanceMap };
    students.forEach((enrollment: any) => {
      const sId = enrollment.student?.id;
      if (sId) {
        updatedMap[sId] = status;
      }
    });
    setAttendanceMap(updatedMap);
  };

  const handleSubmit = async () => {
    const records = Object.entries(attendanceMap).map(
      ([studentId, status]) => ({
        studentId,
        status,
      }),
    );

    if (records.length === 0) {
      Alert.alert("Error", "No students to submit attendance for.");
      return;
    }

    try {
      await submitBulkAttendance.mutateAsync({
        classId: id,
        date: attendanceDate,
        records,
      });
      Alert.alert("Success", "Attendance submitted successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error("Failed to submit attendance:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to submit attendance. Please try again.",
      );
    }
  };

  const dateDisplay = new Date(attendanceDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <ScreenWrapper>
        {/* --- Custom Top Navigation Bar --- */}
        <View className="flex-1 flex-row items-center justify-between mt-4 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-surface-dim border border-outline"
          >
            <Ionicons name="arrow-back-outline" size={20} color="#1C1917" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-on-surface">
            Class Attendance
          </Text>
          <View className="w-10 h-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1  pb-32"
        >
          {/* --- Class Info Header --- */}
          <View className="mb-6">
            <Text className="text-2xl font-black text-on-surface">
              Class {classDetails.name} - {classDetails.section}
            </Text>
            <Text className="text-on-surface-variant text-sm mt-1">
              {dateDisplay}
            </Text>
          </View>

          {/* --- Bulk Actions --- */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => markAll("PRESENT")}
              className="flex-1 bg-success/10 py-3 rounded-xl items-center border border-success/20"
            >
              <Text className="text-xs font-bold text-success">
                Mark All Present
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => markAll("ABSENT")}
              className="flex-1 bg-error/10 py-3 rounded-xl items-center border border-error/20"
            >
              <Text className="text-xs font-bold text-error">
                Mark All Absent
              </Text>
            </TouchableOpacity>
          </View>

          {/* --- Student List --- */}
          <View className="gap-3">
            <Text className="text-xs font-bold text-on-surface-variant tracking-wider uppercase mb-1">
              Students ({students.length})
            </Text>

            {students.length === 0 ? (
              <Card variant="dim" className="p-6 items-center">
                <Text className="text-on-surface-variant">
                  No students enrolled in this class.
                </Text>
              </Card>
            ) : (
              students.map((enrollment: any) => {
                const student = enrollment.student;
                const user = student?.user;
                const fullName = user
                  ? `${user.firstName} ${user.lastName}`
                  : "Unknown Student";
                const rollNo = student?.rollNo || "N/A";
                const currentStatus = attendanceMap[student?.id] || "PRESENT";
                const avatar =
                  user?.profileImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJTiV7AMRW_xObVhIqXKza_MetiafhuqwnA&s";

                return (
                  <Card
                    key={student?.id}
                    variant="dim"
                    className="p-4 flex-row justify-between items-center border border-outline/50"
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <Avatar source={{ uri: avatar }} size={36} />
                      <View className="flex-1">
                        <Text
                          className="text-sm font-bold text-on-surface"
                          numberOfLines={1}
                        >
                          {fullName}
                        </Text>
                        <Text className="text-xs text-on-surface-variant mt-0.5">
                          Roll No: {rollNo}
                        </Text>
                      </View>
                    </View>

                    {/* Present / Absent / Late Toggles */}
                    <View className="flex-row bg-surface border border-outline rounded-xl p-1 gap-1">
                      <TouchableOpacity
                        onPress={() =>
                          handleStatusChange(student.id, "PRESENT")
                        }
                        className={`px-3 py-1.5 rounded-lg ${currentStatus === "PRESENT" ? "bg-success" : ""}`}
                      >
                        <Text
                          className={`text-[10px] font-bold ${currentStatus === "PRESENT" ? "text-white" : "text-on-surface-variant"}`}
                        >
                          P
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleStatusChange(student.id, "ABSENT")}
                        className={`px-3 py-1.5 rounded-lg ${currentStatus === "ABSENT" ? "bg-error" : ""}`}
                      >
                        <Text
                          className={`text-[10px] font-bold ${currentStatus === "ABSENT" ? "text-white" : "text-on-surface-variant"}`}
                        >
                          A
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleStatusChange(student.id, "LATE")}
                        className={`px-3 py-1.5 rounded-lg ${currentStatus === "LATE" ? "bg-amber-500" : ""}`}
                      >
                        <Text
                          className={`text-[10px] font-bold ${currentStatus === "LATE" ? "text-white" : "text-on-surface-variant"}`}
                        >
                          L
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                );
              })
            )}
          </View>
        </ScrollView>

        {/* --- Submit Button overlay --- */}
      </ScreenWrapper>
      <View className="absolute bottom-6 mx-8 left-4 right-4 bg-transparent">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitBulkAttendance.isPending}
          className="bg-primary py-4 rounded-2xl items-center shadow-lg shadow-primary/30 flex-row justify-center gap-2"
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={20}
            color="white"
          />
          <Text className="text-white font-bold text-base">
            {submitBulkAttendance.isPending
              ? "Submitting..."
              : "Submit Attendance"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
