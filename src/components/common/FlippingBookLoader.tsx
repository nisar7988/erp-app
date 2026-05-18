import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

export default function FlippingBookLoader() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(180, {
        duration: 800,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateValue = rotation.value;
    return {
      transform: [{ perspective: 500 }, { rotateY: `-${rotateValue}deg` }],
      backgroundColor: interpolateColor(
        rotateValue,
        [0, 90, 180],
        ["#ffffff", "#f8fafc", "#ffffff"],
      ),
    };
  });

  return (
    <View className="items-center justify-center">
      <View className="flex-row relative items-center">
        {/* Left Page (Static) */}
        <View className="w-8 h-10 bg-white border-2 border-r-[1px] border-primary rounded-l-md shadow-sm" />
        {/* Right Page (Static) */}
        <View className="w-8 h-10 bg-white border-2 border-l-[1px] border-primary rounded-r-md shadow-sm" />

        {/* Flipping Page */}
        <Animated.View
          className="absolute left-8 w-8 h-10 border-2 border-primary rounded-r-md"
          style={[animatedStyle, { transformOrigin: "left" } as any]}
        />
      </View>
    </View>
  );
}
