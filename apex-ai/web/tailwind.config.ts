import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0D0F14",
          surface: "#161A22",
          elevated: "#1E2330",
        },
        accent: {
          DEFAULT: "#4F8EF7",
          hover: "#6BA3F9",
        },
        success: "#34C97B",
        warning: "#F5A623",
        danger: "#E8425A",
        text: {
          primary: "#E8EBF0",
          secondary: "#8A92A3",
        },
        border: "#2A3142",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
