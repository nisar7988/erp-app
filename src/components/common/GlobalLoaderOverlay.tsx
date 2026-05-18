import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FlippingBookLoader from "./FlippingBookLoader";

export default function GlobalLoaderOverlay({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      className="absolute top-0 bottom-0 left-0 right-0 z-[999] justify-center items-center bg-black/40"
    >
      <View className="bg-surface p-6 py-8 rounded-2xl items-center justify-center shadow-2xl min-w-[140px] max-w-[200px]">
        <FlippingBookLoader />
        <Text className="text-on-surface font-medium mt-6 text-center text-sm">
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}
