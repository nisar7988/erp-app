import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

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

  useEffect(() => {
    if (!_hasHydrated) return;

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
  }, [isAuthenticated, _hasHydrated, segments]);

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
