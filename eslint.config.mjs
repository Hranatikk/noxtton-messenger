import reactCompiler from "eslint-plugin-react-compiler"
import perfectionist from "eslint-plugin-perfectionist"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig, globalIgnores } from "eslint/config"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"

const compat = new FlatCompat({
  allConfig: js.configs.all,
  recommendedConfig: js.configs.recommended,
})

export default defineConfig([
  globalIgnores([
    "node_modules/**/*",
    "templates/**/*",
    "**/.prettierrc.js",
    "**/eslint.config.mjs",
  ]),
  {
    extends: compat.extends("@react-native"),

    plugins: {
      "@typescript-eslint": tseslint,
      perfectionist,
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler
    },

    languageOptions: {
      ecmaVersion: 5,
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        requireConfigFile: false,
      },
      sourceType: "script",
    },

    rules: {
      "@typescript-eslint/consistent-type-imports": 2,
      "comma-dangle": [0, "never"],
      curly: "off",
      "newline-before-return": "warn",
      "no-shadow": "off",
      "no-undef": "off",
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": 0,
      "react-native/no-inline-styles": 0,
      semi: ["error", "never"],

      "react-compiler/react-compiler": "error",

      "perfectionist/sort-objects": [
        "error",
        {
          groups: ["unknown", "booleanValue", "props", "renderItems", "callback"],
          partitionByComment: true,
          partitionByNewLine: true,
          type: "alphabetical",

          customGroups: {
            booleanValue: "^is.+",
            callback: "^on.+",
            props: "^props",
            renderItems: "^render.+",
          },
        },
      ],

      "perfectionist/sort-object-types": [
        "error",
        {
          groups: ["unknown", "booleanValue", "props", "renderItems", "callback"],
          partitionByComment: true,
          partitionByNewLine: true,
          type: "alphabetical",

          customGroups: {
            booleanValue: "^is.+",
            callback: "^on.+",
            props: "^props",
            renderItems: "^render.+",
          },
        },
      ],

      "perfectionist/sort-jsx-props": [
        "error",
        {
          groups: ["unknown", "booleanValue", "props", "renderItems", "callback"],
          type: "alphabetical",

          customGroups: {
            booleanValue: "^is.+",
            callback: "^on.+",
            props: "^props",
            renderItems: "^render.+",
          },
        },
      ],

      "perfectionist/sort-named-imports": [
        "error",
        {
          groupKind: "values-first",
          type: "alphabetical",
        },
      ],

      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: {
            value: {
              react: "^react$",
              "react-native": "^react-native$",
              "react-libs": "^@react",
              shopify: "^@shopify",
              "bottom-sheets": "^@gorhom",
              tabler: "^@tabler",
              packages: "^[a-zA-Z]",
              aliases: "^@",
              "relative-distant": "^(\\.\\.\\/)+",
              "relative-near": "^\\./",
            },
          },

          groups: [
            "react",
            "react-native",
            "react-libs",
            "shopify",
            "bottom-sheets",
            "tabler",
            "packages",
            "aliases",
            "relative-distant",
            "relative-near",
          ],

          partitionByComment: true,
          ignoreCase: true,
          newlinesBetween: "never",
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      "@typescript-eslint/no-shadow": 0,
      "@typescript-eslint/no-unused-vars": 2,
      "no-unused-vars": 0,
    },
  },
  eslintPluginPrettierRecommended,
])
