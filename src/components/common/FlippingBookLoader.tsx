import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
  withSequence,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const PageLines = () => (
  <View className="flex-1 px-1 py-1.5 justify-evenly opacity-30">
    <View className="h-[2px] bg-primary rounded-full w-full" />
    <View className="h-[2px] bg-primary rounded-full w-4/5" />
    <View className="h-[2px] bg-primary rounded-full w-full" />
    <View className="h-[2px] bg-primary rounded-full w-full" />
  </View>
);

export default function FlippingBookLoader() {
  const progress = useSharedValue(0);
  const bounce = useSharedValue(0);

  useEffect(() => {
    // Continuous page turning from 0 to 1
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1600, // Slower, more elegant flip
        easing: Easing.linear, // Linear to keep the staggered pages in perfect sync
      }),
      -1,
      false, // keep looping seamlessly
    );

    // Gentle breathing/bouncing of the entire book
    bounce.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, []);

  const bookContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  // Create staggered flipping pages for a continuous illusion
  const createPageStyle = (offset: number) =>
    useAnimatedStyle(() => {
      const pageProgress = (progress.value + offset) % 1;

      // We flip from 0 to 180 degrees over the lifecycle of this page.
      // Easing applied here instead of the raw progress value.
      const easeProgress = Easing.inOut(Easing.cubic)(pageProgress);
      const rotateValue = interpolate(
        easeProgress,
        [0, 1],
        [0, 180],
        Extrapolation.CLAMP,
      );

      return {
        transform: [{ perspective: 800 }, { rotateY: `-${rotateValue}deg` }],
        backgroundColor: interpolateColor(
          rotateValue,
          [0, 90, 180],
          ["#ffffff", "#e2e8f0", "#ffffff"], // Add a shadow as it stands up
        ),
        // Hide the page right before it snaps back to 0 to prevent glitchy loops
        opacity: rotateValue > 175 || rotateValue < 5 ? 0 : 1,
        zIndex: rotateValue > 90 ? 10 : 20,
      };
    });

  const page1Style = createPageStyle(0);
  const page2Style = createPageStyle(0.5);

  return (
    <Animated.View
      className="items-center justify-center"
      style={bookContainerStyle}
    >
      {/* Book Cover Background */}
      <View className="flex-row relative items-center p-1 bg-primary rounded-lg shadow-lg shadow-primary/30">
        {/* Left Page (Static) */}
        <View className="w-8 h-10 bg-white border-2 border-primary rounded-l-md overflow-hidden">
          <PageLines />
        </View>

        {/* Right Page (Static) */}
        <View className="w-8 h-10 bg-white border-2 border-primary rounded-r-md overflow-hidden">
          <PageLines />
        </View>

        {/* Center Binding Line (Spine) */}
        <View className="absolute left-[35px] w-[2px] h-[36px] bg-primary/20 rounded-full z-10" />

        {/* Flipping Page 1 */}
        <Animated.View
          className="absolute left-[36px] w-8 h-10 border-2 border-primary rounded-r-md overflow-hidden"
          style={[page1Style, { transformOrigin: "left" } as any]}
        >
          <PageLines />
        </Animated.View>

        {/* Flipping Page 2 */}
        <Animated.View
          className="absolute left-[36px] w-8 h-10 border-2 border-primary rounded-r-md overflow-hidden"
          style={[page2Style, { transformOrigin: "left" } as any]}
        >
          <PageLines />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
