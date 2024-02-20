import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#0d0d0d",
            foreground: "#f4f0e3",
            primary: { DEFAULT: "#f4f0e3", foreground: "#020202" },
            secondary: { DEFAULT: "#506384", foreground: "#f4f0e3" },
          },
        },
        zsti: {
          colors: {
            background: "#0d0d0d",
            foreground: "#f4f0e3",
            primary: { DEFAULT: "#f9b522", foreground: "#020202" },
            secondary: { DEFAULT: "#506384", foreground: "#f4f0e3" },
          },
        },
      },
    }),
  ],
} satisfies Config;
