import { View, Text, Pressable } from "react-native";

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

/**
 * Themed checkbox row with a label. Uses a simple bordered square with
 * a filled state for the checkmark.
 */
export default function CheckboxRow({
  label,
  checked,
  onToggle,
}: CheckboxRowProps) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center gap-3"
      hitSlop={8}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded border ${
          checked
            ? "border-primary bg-primary"
            : "border-outline bg-surface"
        }`}
      >
        {checked && (
          <Text className="text-xs font-bold text-white">✓</Text>
        )}
      </View>
      <Text className="text-sm text-on-surface-variant">{label}</Text>
    </Pressable>
  );
}
