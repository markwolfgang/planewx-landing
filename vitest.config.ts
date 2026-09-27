import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    include: ["lib/**/*.test.ts", "components/**/*.test.ts", "components/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
