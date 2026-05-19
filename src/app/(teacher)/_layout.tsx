import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import FloatingComponent from "@/components/ai-box/FloatingComponent";

export default function TeacherLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.onSurfaceVariant,
          tabBarStyle: {
            position: "absolute",
            left: 16,
            right: 16,
            backgroundColor: Colors.surface,
            borderRadius: 24,
            height: 68,
            paddingTop: 8,
            borderTopWidth: 0,
            // Shadow for iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            // Elevation for Android
            elevation: 10,
            borderTopColor: "transparent",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },
          headerShown: false,
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="classes"
          options={{
            title: "Classes",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "school" : "school-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <FloatingComponent />
    </>
  );
}
