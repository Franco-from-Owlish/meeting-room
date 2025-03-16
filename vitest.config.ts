import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        enabled: true,
        provider: "istanbul",
        reporter: ["html", "lcov", "cobertura", "text"],
      },
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      setupFiles: [
        "fake-indexeddb/auto"
      ],
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  }),
);
