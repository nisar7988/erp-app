import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FULL_TEXT = "EduPortal";
const ACCENT_COUNT = 3; // "Edu" in brand orange
const LETTER_DELAY = 120; // ms between each letter
const START_DELAY = 600; // ms before typing begins
const CURSOR_BLINK_RATE = 500;

// Amber Atelier theme colors
const THEME = {
  primary: "#E66C19",
  primaryVariant: "#FF8A3D",
  primaryContainer: "#FEE5D9",
  surface: "#FFFBF9",
  surfaceDim: "#F7F2F0",
  onSurface: "#1C1917",
  onSurfaceVariant: "#78716C",
  outline: "#E7E5E4",
};

export default function SplashScreen({ onFinish }: { onFinish: any }) {
  const [displayedLetters, setDisplayedLetters] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);

  // Animated values
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(10)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;
  const shimmerX = useRef(new Animated.Value(-80)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  // Glow pulse
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.85,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Icon entrance
  useEffect(() => {
    Animated.parallel([
      Animated.spring(iconScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 6,
      }),
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Typing effect
  useEffect(() => {
    const timers: any = [];
    FULL_TEXT.split("").forEach((_, i) => {
      const t = setTimeout(
        () => {
          setDisplayedLetters((prev: any) => [...prev, FULL_TEXT[i]]);
          if (i === FULL_TEXT.length - 1) {
            setTypingDone(true);
          }
        },
        START_DELAY + i * LETTER_DELAY,
      );
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, CURSOR_BLINK_RATE);
    return () => clearInterval(interval);
  }, []);

  // Hide cursor & show tagline after typing
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => {
      setShowCursor(false);

      // Show subtitle first
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(taglineY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // Shimmer line
      Animated.loop(
        Animated.timing(shimmerX, {
          toValue: 80,
          duration: 1200,
          useNativeDriver: true,
        }),
      ).start();

      // Optional: call onFinish after a delay
      if (onFinish) {
        setTimeout(onFinish, 2000);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [typingDone]);

  return (
    <View style={styles.container}>
      {/* Background glow */}
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

      <View style={styles.content}>
        {/* Icon */}
        <Animated.View
          style={[
            styles.iconRing,
            { opacity: iconOpacity, transform: [{ scale: iconScale }] },
          ]}
        >
          <SchoolIcon />
        </Animated.View>

        {/* Brand name with typing */}
        <View style={styles.brandRow}>
          {displayedLetters.map((letter, i) => (
            <Animated.Text
              key={i}
              style={[
                styles.brandLetter,
                i < ACCENT_COUNT && styles.brandAccent,
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
          {/* Cursor */}
          {showCursor && <View style={styles.cursor} />}
        </View>

        {/* Subtitle — "Amber Atelier" */}
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Amber Atelier
        </Animated.Text>

        {/* Shimmer line */}
        <View style={styles.shimmerContainer}>
          <View style={styles.shimmerTrack}>
            <Animated.View
              style={[
                styles.shimmerBar,
                { transform: [{ translateX: shimmerX }] },
              ]}
            />
          </View>
        </View>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            { opacity: taglineOpacity, transform: [{ translateY: taglineY }] },
          ]}
        >
          Learn · Grow · Succeed
        </Animated.Text>

        {/* Dots */}
        <Animated.View style={[styles.dotsRow, { opacity: taglineOpacity }]}>
          <View style={[styles.dot, { backgroundColor: THEME.primaryContainer }]} />
          <View style={[styles.dot, { backgroundColor: THEME.primaryVariant }]} />
          <View style={[styles.dot, { backgroundColor: THEME.primary }]} />
        </Animated.View>
      </View>
    </View>
  );
}

function SchoolIcon() {
  return (
    <View style={styles.iconWrapper}>
      {/* Simplified school / graduation cap icon using shapes */}
      <View style={styles.capTop} />
      <View style={styles.capBase} />
      <View style={styles.pillarsRow}>
        <View style={styles.pillar} />
        <View style={styles.pillar} />
        <View style={styles.pillar} />
      </View>
      <View style={styles.foundation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: THEME.primaryContainer,
    alignSelf: "center",
    top: height / 2 - (width * 0.85) / 2,
  },
  content: {
    alignItems: "center",
    gap: 12,
  },
  iconRing: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 8,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  capTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ffffff",
  },
  capBase: {
    width: 28,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  pillarsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  pillar: {
    width: 3,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 1,
  },
  foundation: {
    width: 28,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 72,
  },
  brandLetter: {
    fontSize: 48,
    fontWeight: "700",
    color: THEME.onSurface,
    letterSpacing: 1,
  },
  brandAccent: {
    color: THEME.primary,
  },
  cursor: {
    width: 3,
    height: 52,
    backgroundColor: THEME.primary,
    borderRadius: 2,
    marginLeft: 3,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 4,
    textTransform: "uppercase",
    color: THEME.primary,
    marginTop: -4,
  },
  shimmerContainer: {
    width: 80,
    height: 2,
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: THEME.outline,
    marginTop: 4,
  },
  shimmerTrack: {
    flex: 1,
    overflow: "hidden",
  },
  shimmerBar: {
    width: 60,
    height: "100%",
    backgroundColor: THEME.primary,
    borderRadius: 2,
    opacity: 0.7,
  },
  tagline: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 3.5,
    textTransform: "uppercase",
    color: THEME.onSurfaceVariant,
    marginTop: 8,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
