import { useState, useCallback } from "react";
import type { LoginFormState, UserRole } from "../types/auth";

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
      // TODO: Integrate with auth service
      // await authService.login({ email: form.email, password: form.password, role: form.role });
      console.log("Login submitted:", {
        email: form.email,
        role: form.role,
        rememberMe: form.rememberMe,
      });
    } catch (error) {
      console.error("Login failed:", error);
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
