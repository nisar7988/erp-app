import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginForm } from "../../hooks/useLoginForm";
import {
  FormInput,
  GradientButton,
  CheckboxRow,
} from "../../components/auth";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

/**
 * Login Screen — (auth)/index
 *
 * Production-ready login page for the Amber Atelier ERP.
 * Features a premium design with decorative backgrounds and themed components.
 */
export default function LoginScreen() {
  const {
    form,
    setField,
    isPasswordVisible,
    togglePasswordVisibility,
    toggleRememberMe,
    isFormValid,
    isSubmitting,
    handleSubmit,
  } = useLoginForm();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface-dim">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Decorative Background Elements */}
        <View 
          pointerEvents="none"
          style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: Colors.primaryContainer, opacity: 0.3 }} 
        />
        <View 
          pointerEvents="none"
          style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: Colors.primary, opacity: 0.05 }} 
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-8 pt-12 pb-10">
            {/* ── Logo & Header ────────────────────────────────── */}
            <View className="mb-12">
              <View className="mb-6 h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                <Ionicons name="school" size={32} color="white" />
              </View>
              
              <View>
                <Text className="text-sm font-extrabold uppercase tracking-[4px] text-primary">
                  Amber Atelier
                </Text>
                <Text className="mt-2 text-4xl font-black leading-tight text-on-surface">
                  Academic{"\n"}Portal
                </Text>
                <View className="mt-4 h-1 w-12 rounded-full bg-primary" />
                <Text className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant">
                  Welcome back! Please enter your{"\n"}institutional credentials.
                </Text>
              </View>
            </View>

            {/* ── Form Fields ─────────────────────────────────── */}
            <View className="gap-6">
              <FormInput
                label="Institutional Email"
                value={form.email}
                onChangeText={(text) => setField("email", text)}
                placeholder="name@atelier.edu"
                keyboardType="email-address"
                autoCapitalize="none"
                leadingIcon="mail-outline"
              />

              <FormInput
                label="Password"
                value={form.password}
                onChangeText={(text) => setField("password", text)}
                placeholder="••••••••"
                secureTextEntry={!isPasswordVisible}
                leadingIcon="lock-closed-outline"
                trailingLabel="FORGOT?"
                onTrailingPress={() => {
                  // TODO: Navigate to forgot password
                }}
                trailingIcon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                onTrailingIconPress={togglePasswordVisibility}
              />
            </View>

            {/* ── Remember Me ─────────────────────────────────── */}
            <View className="mt-8 mb-10">
              <CheckboxRow
                label="Keep me signed in on this device"
                checked={form.rememberMe}
                onToggle={toggleRememberMe}
              />
            </View>

            {/* ── Submit ──────────────────────────────────────── */}
            <View className="mt-auto pt-4">
              <GradientButton
                label="Sign In"
                onPress={handleSubmit}
                disabled={!isFormValid}
                loading={isSubmitting}
              />
              
              <View className="mt-8 flex-row items-center justify-center">
                <Text className="text-sm text-on-surface-variant">
                  Need assistance?{" "}
                </Text>
                <Text className="text-sm font-bold text-primary">
                  Contact Support
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
