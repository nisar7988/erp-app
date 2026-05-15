import { View, TextInput, Text, Pressable } from "react-native";
import type { KeyboardTypeOptions } from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  /** Icon character rendered in the left slot */
  leadingIcon?: string;
  /** Optional right-side action (e.g. "FORGOT PASSWORD?") */
  trailingLabel?: string;
  onTrailingPress?: () => void;
  /** For password fields: toggles visibility */
  trailingIcon?: string;
  onTrailingIconPress?: () => void;
}

/**
 * Themed text input with label, leading icon, and optional trailing action.
 * Follows Material-style input patterns adapted for the Amber Atelier palette.
 */
export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  leadingIcon,
  trailingLabel,
  onTrailingPress,
  trailingIcon,
  onTrailingIconPress,
}: FormInputProps) {
  return (
    <View className="gap-2">
      {/* Label row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </Text>
        {trailingLabel && (
          <Pressable onPress={onTrailingPress} hitSlop={8}>
            <Text className="text-xs font-bold text-primary">
              {trailingLabel}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Input container */}
      <View className="flex-row items-center rounded-xl border border-outline bg-surface px-4 py-3.5">
        {leadingIcon && (
          <Text className="mr-3 text-base text-on-surface-variant">
            {leadingIcon}
          </Text>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A8A29E"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          className="flex-1 text-base text-on-surface"
          style={{ fontSize: 15, paddingVertical: 0 }}
        />
        {trailingIcon && (
          <Pressable onPress={onTrailingIconPress} hitSlop={12}>
            <Text className="ml-3 text-base text-on-surface-variant">
              {trailingIcon}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
