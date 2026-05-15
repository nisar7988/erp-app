import { Pressable, Text, View } from "react-native";
import type { UserRole } from "../../types/auth";

const ROLES: UserRole[] = ["Student", "Teacher", "Admin"];

interface RoleTabBarProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

/**
 * Segmented control for switching between user roles.
 * Uses the app's theme tokens via NativeWind utility classes.
 */
export default function RoleTabBar({ activeRole, onRoleChange }: RoleTabBarProps) {
  return (
    <View className="flex-row rounded-xl bg-surface-dim p-1">
      {ROLES.map((role) => {
        const isActive = role === activeRole;
        return (
          <Pressable
            key={role}
            onPress={() => onRoleChange(role)}
            className={`flex-1 items-center rounded-lg py-2.5 ${
              isActive ? "bg-surface" : ""
            }`}
            style={isActive ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            } : undefined}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive ? "text-on-surface" : "text-on-surface-variant"
              }`}
            >
              {role}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
