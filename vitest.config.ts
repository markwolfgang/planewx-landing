import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    include: [
      "lib/**/*.test.ts",
      "lib/**/*.test.tsx",
      "components/**/*.test.ts",
      "components/**/*.test.tsx",
      "app/learn/**/*.test.ts",
      "app/learn/**/*.test.tsx",
      "app/ga-customs/**/*.test.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
