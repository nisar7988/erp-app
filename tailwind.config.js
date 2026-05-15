/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-variant": "var(--primary-variant)",
        surface: "var(--surface)",
        "surface-dim": "var(--surface-dim)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        outline: "var(--outline)",
        success: "var(--success)",
        error: "var(--error)",
      },
    },
  },
  plugins: [],
};
