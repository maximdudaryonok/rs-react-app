import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  ...tseslint.config(
    {
      ignores: ["dist", "coverage", "**/*.test.ts", "**/*.test.tsx"],
    },
    {
      extends: [
        js.configs.recommended,
        ...tseslint.configs.strict,
        eslintPluginPrettier,
      ],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        "react-compiler": reactCompiler,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-compiler/react-compiler": "error",
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,

        "padding-line-between-statements": [
          "error",
          { blankLine: "always", prev: "*",        next: ["return", "break"] },
          { blankLine: "always", prev: ["const", "let"], next: "*"           },
          { blankLine: "any",    prev: ["const", "let"], next: ["const", "let"] },
          { blankLine: "always", prev: "*",        next: "if"                },
          { blankLine: "always", prev: "if",      next: "*"                 },
        ],
      },
      settings: {
        react: { version: "detect" },
      },
    }
  ),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/prop-types": "off",
    },
  },
];