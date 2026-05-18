import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

/**
 * Themed checkbox row with a label. Uses a simple bordered square with
 * an Ionicons checkmark for the active state.
 */
export default function CheckboxRow({
  label,
  checked,
  onToggle,
}: CheckboxRowProps) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center gap-3.5"
      hitSlop={12}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
          checked
            ? "border-primary bg-primary"
            : "border-outline bg-surface"
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </View>
      <Text className="text-sm font-medium text-on-surface-variant">
        {label}
      </Text>
    </Pressable>
  );
}
