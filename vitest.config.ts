import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "weeks/**/*.test.ts"],
    passWithNoTests: true,
  },
});
