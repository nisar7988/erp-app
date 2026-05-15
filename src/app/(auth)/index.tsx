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
  RoleTabBar,
  FormInput,
  GradientButton,
  CheckboxRow,
} from "../../components/auth";
import { useRouter } from "expo-router";

/**
 * Login Screen — (auth)/index
 *
 * Production-ready login page for the Amber Atelier ERP.
 * Delegates all state management to `useLoginForm` hook.
 * Composed from reusable, themed auth components.
 */
export default function LoginScreen() {
  const {
    form,
    setField,
    setRole,
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
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4 pb-8">
            {/* ── Header ──────────────────────────────────────── */}
            <View className="mb-8">
              <Text className="mb-3 text-lg font-bold text-primary">
                Amber Atelier
              </Text>
              <Text className="text-3xl font-bold leading-tight text-on-surface">
                Academic Portal{"\n"}Access
              </Text>
              <Text className="mt-2 text-sm text-on-surface-variant">
                Enter your credentials to manage your{"\n"}academic journey.
              </Text>
            </View>

            {/* ── Role Selector ────────────────────────────────── */}
            {/* <View className="mb-8">
              <RoleTabBar activeRole={form.role} onRoleChange={setRole} />
            </View> */}

            {/* ── Form Fields ─────────────────────────────────── */}
            <View className="gap-5">
              <FormInput
                label="Institutional Email"
                value={form.email}
                onChangeText={(text) => setField("email", text)}
                placeholder="name@atelier.edu"
                keyboardType="email-address"
                autoCapitalize="none"
                leadingIcon="@"
              />

              <FormInput
                label="Password"
                value={form.password}
                onChangeText={(text) => setField("password", text)}
                placeholder="••••••••"
                secureTextEntry={!isPasswordVisible}
                leadingIcon="🔒"
                trailingLabel="FORGOT PASSWORD?"
                onTrailingPress={() => {
                  // TODO: Navigate to forgot password
                }}
                trailingIcon={isPasswordVisible ? "🙈" : "👁"}
                onTrailingIconPress={togglePasswordVisibility}
              />
            </View>

            {/* ── Remember Me ─────────────────────────────────── */}
            <View className="mt-6 mb-8">
              <CheckboxRow
                label="Keep me signed in on this device"
                checked={form.rememberMe}
                onToggle={toggleRememberMe}
              />
            </View>

            {/* ── Submit ──────────────────────────────────────── */}
            <View className="mt-auto">
              <GradientButton
                label="Sign In"
                // onPress={handleSubmit}
                onPress={() => {
                  router.navigate("/(tabs)");
                }}
                disabled={false}
                loading={isSubmitting}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
