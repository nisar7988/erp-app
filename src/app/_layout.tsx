import "../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import * as ExpoSplashScreen from "expo-splash-screen";
import SplashScreen from "../components/splash-screen";

// Prevent the native splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1, // Only retry once to fail faster
      refetchOnWindowFocus: false, // Don't refetch on app focus in mobile unless explicitly needed
    },
  },
});

export default function RootLayout() {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  // Hide the native splash screen once the app is ready
  useEffect(() => {
    if (_hasHydrated) {
      ExpoSplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  useEffect(() => {
    if (!_hasHydrated || showSplash) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (isAuthenticated && inAuthGroup) {
      const user = useAuthStore.getState().user;
      if (user?.role === "TEACHER") {
        router.replace("/(teacher)");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [isAuthenticated, _hasHydrated, segments, showSplash]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Show the custom animated splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!_hasHydrated) {
    return null; // Wait for Zustand to load from AsyncStorage
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(teacher)" />
      </Stack>
    </QueryClientProvider>
  );
}
