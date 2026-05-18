import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/layout/ScreenWrapper";
import { Card } from "../components/ui/Card";
import { useProfile } from "../hooks/useStudentData";
import GlobalLoaderOverlay from "../components/common/GlobalLoaderOverlay";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Information..." />;
  }

  const student = profile?.studentProfile;
  const currentClass = student?.enrollments?.[0]?.class?.name || "N/A";

  const InfoRow = ({ label, value, isLast = false }: { label: string; value: string | undefined; isLast?: boolean }) => (
    <View className={`py-4 flex-row justify-between items-center ${!isLast ? "border-b border-outline/30" : ""}`}>
      <Text className="text-on-surface-variant text-sm font-medium">{label}</Text>
      <Text className="text-on-surface text-sm font-bold text-right flex-1 ml-4" numberOfLines={2}>
        {value || "N/A"}
      </Text>
    </View>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-8">
      <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-3 uppercase px-2">
        {title}
      </Text>
      <Card variant="default" className="px-5 py-2">
        {children}
      </Card>
    </View>
  );

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <ScreenWrapper padding={false}>
      {/* --- Navigation Header --- */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-on-surface ml-2">Personal Info</Text>
      </View>

      <ScrollView 
        className="flex-1 px-6 mt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Section title="Academic Details">
          <InfoRow label="Admission No." value={student?.admissionNo} />
          <InfoRow label="Roll No." value={student?.rollNo} />
          <InfoRow label="Current Class" value={currentClass} isLast />
        </Section>

        <Section title="Personal Details">
          <InfoRow label="First Name" value={profile?.firstName} />
          <InfoRow label="Last Name" value={profile?.lastName} />
          <InfoRow label="Date of Birth" value={formatDate(student?.dateOfBirth)} />
          <InfoRow label="Gender" value={student?.gender} isLast />
        </Section>

        <Section title="Contact Information">
          <InfoRow label="Email Address" value={profile?.email} />
          <InfoRow label="Phone Number" value={profile?.phone} />
          <InfoRow label="Emergency Contact" value={student?.emergencyContact} />
          <InfoRow label="Home Address" value={student?.address} isLast />
        </Section>

        <Section title="Parent Details">
          <InfoRow label="Father's Name" value={student?.fatherName} />
          <InfoRow label="Mother's Name" value={student?.motherName} isLast />
        </Section>
      </ScrollView>
    </ScreenWrapper>
  );
}
