import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import type { KeyboardTypeOptions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  /** Icon name from Ionicons */
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  /** Optional right-side action (e.g. "FORGOT PASSWORD?") */
  trailingLabel?: string;
  onTrailingPress?: () => void;
  /** For password fields: toggles visibility */
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  onTrailingIconPress?: () => void;
}

/**
 * Themed text input with label, leading icon, and optional trailing action.
 * Follows Material-style input patterns adapted for the EduPortal palette.
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
  const [isFocused, setIsFocused] = useState(false);

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
      <View
        className={`flex-row items-center rounded-2xl border bg-surface px-4 py-3.5 ${
          isFocused ? "border-primary bg-white" : "border-outline bg-surface"
        }`}
        style={{
          borderWidth: 1.5,
        }}
      >
        {leadingIcon && (
          <Ionicons
            name={leadingIcon}
            size={20}
            color={isFocused ? Colors.primary : Colors.onSurfaceVariant}
            className="mr-3"
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A8A29E"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-base font-medium text-on-surface"
          style={{ fontSize: 15, paddingVertical: 0 }}
        />
        {trailingIcon && (
          <Pressable onPress={onTrailingIconPress} hitSlop={12}>
            <Ionicons
              name={trailingIcon}
              size={20}
              color={Colors.onSurfaceVariant}
              style={{ marginLeft: 12 }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
