import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from "eslint-plugin-cypress/flat";
import importPlugin from "eslint-plugin-import";
import oxlint from "eslint-plugin-oxlint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    ...pluginCypress.configs.recommended,
    files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"],
  },
  ...oxlint.configs["flat/recommended"],
  skipFormatting,

  {
    plugins: { "simple-import-sort": simpleImportSort, "import": importPlugin },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side effect imports at the start. For me this is important because I want to import reset.css and global styles at the top of my main file.
            ["^\\u0000"],
            // 2. `vue` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^vue$", "^@?\\w"],
            // 3. Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group. (also relative imports starting with "../")
            ["^@", "^"],
            // 4. relative imports from same folder "./" (I like to have them grouped together)
            ["^\\./"],
            // 5. style module imports always come last, this helps to avoid CSS order issues
            ["^.+\\.(module.css|module.scss)$"],
            // 6. media imports
            ["^.+\\.(gif|png|svg|jpg)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
);
