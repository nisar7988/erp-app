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
      className="flex-1 justify-center items-center bg-surface z-[999]"
    >
      <View className="items-center justify-center min-w-[140px]">
        <FlippingBookLoader />
        <Text className="text-on-surface font-medium mt-6 text-center text-sm">
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}
