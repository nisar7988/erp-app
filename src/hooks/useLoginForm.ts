import { useState, useCallback } from "react";
import type { LoginFormState, UserRole } from "../types/auth";
import { authService } from "../services/authService";
import { useRouter } from "expo-router";

const INITIAL_STATE: LoginFormState = {
  email: "",
  password: "",
  role: "Student",
  rememberMe: false,
};

/**
 * Encapsulates all login form state and validation logic.
 * Keeps the screen component purely presentational.
 */
export function useLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = useCallback(
    <K extends keyof LoginFormState>(key: K, value: LoginFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setRole = useCallback((role: UserRole) => {
    setForm((prev) => ({ ...prev, role }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleRememberMe = useCallback(() => {
    setForm((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  }, []);

  const isEmailValid = form.email.length > 0 && form.email.includes("@");
  const isPasswordValid = form.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = useCallback(async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { user } = await authService.login({
        email: form.email,
        password: form.password,
      });
      if (user?.role === "TEACHER") {
        router.replace("/(teacher)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isFormValid, isSubmitting]);

  return {
    form,
    setField,
    setRole,
    isPasswordVisible,
    togglePasswordVisibility,
    toggleRememberMe,
    isFormValid,
    isSubmitting,
    handleSubmit,
  } as const;
}
