import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#fee2e2",
          300: "#fca5a5",
          500: "#E82530",
          700: "#D8242E",
          900: "#8A0909",
        },
        secondary: "#F2DFE4",
        tertiary: "#EDE9E9",
        light: "#FFFFFF",
        dark: "#2B2A2A",
      },
      keyframes: {
        "checkbox-wave": {
          "50%": { transform: "scale(0.9)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
