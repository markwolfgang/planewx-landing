import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "hsl(210 70% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(210 10% 96%)",
          foreground: "hsl(210 10% 25%)",
        },
        muted: {
          DEFAULT: "hsl(210 10% 94%)",
          foreground: "hsl(210 10% 50%)",
        },
        accent: {
          DEFAULT: "hsl(210 10% 96%)",
          foreground: "hsl(210 10% 25%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        border: "hsl(210 10% 90%)",
        input: "hsl(0 0% 100%)",
        ring: "hsl(210 70% 50%)",
        success: {
          DEFAULT: "hsl(145 70% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config

