/**
 * Amber Atelier Color Palette
 * 
 * This palette is used throughout the application for branding and consistency.
 * These values mirror the CSS variables in global.css.
 */

export const Colors = {
  primary: "#E66C19",
  primaryVariant: "#FF8A3D",
  primaryContainer: "#FEE5D9",
  surface: "#FFFBF9",
  surfaceDim: "#F7F2F0",
  surfaceVariant: "#FFF7F3",
  onSurface: "#1C1917",
  onSurfaceVariant: "#78716C",
  outline: "#E7E5E4",
  success: "#16A34A",
  error: "#DC2626",
} as const;

export type AppColor = keyof typeof Colors;
