import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";

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
      server: {
        deps: { inline: ["vuetify"] },
      },
      exclude: [...configDefaults.exclude, "e2e/**"],
      setupFiles: ["fake-indexeddb/auto"],
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  }),
);
