import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { Colors } from "../../constants/Colors";

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Primary CTA button using the Amber Atelier brand orange.
 * Simulates a gradient feel using a layered approach with the primary palette.
 * Shows a loading spinner when submitting.
 */
export default function GradientButton({
  label,
  onPress,
  disabled = false,
  loading = false,
}: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
        transform: [{ scale: pressed ? 0.985 : 1 }],
      })}
    >
      <View
        style={{
          backgroundColor: disabled ? Colors.outline : Colors.primary,
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          overflow: "hidden",
        }}
      >
        {/* Faux gradient highlight on the right side */}
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "60%",
            backgroundColor: disabled ? Colors.outline : Colors.primaryVariant,
            opacity: 0.5,
            borderTopLeftRadius: 60,
            borderBottomLeftRadius: 60,
          }}
        />
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {label}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              →
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
