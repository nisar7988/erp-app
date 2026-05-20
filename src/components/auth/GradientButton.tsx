import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Primary CTA button using the EduPortal brand orange.
 * Uses LinearGradient for a premium, vibrant look.
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
        opacity: disabled ? 0.6 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <LinearGradient
        colors={
          disabled
            ? [Colors.outline, Colors.outline]
            : [Colors.primary, Colors.primaryVariant]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          paddingVertical: 18,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: disabled ? 0 : 0.3,
          shadowRadius: 12,
          elevation: disabled ? 0 : 6,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Text
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              {label}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}
