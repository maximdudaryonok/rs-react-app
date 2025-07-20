import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(
    { ignores: ["dist", "coverage"] },
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
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "react-compiler/react-compiler": "error",
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
        'padding-line-between-statements': [
          2,
          {
            blankLine: 'always',
            prev: '*',
            next: ['return', 'break'],
          },
          {
            blankLine: 'always',
            prev: ['const', 'let'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let'],
            next: ['const', 'let'],
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'if',
          },
          {
            blankLine: 'always',
            prev: 'if',
            next: '*',
          },
        ],
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
);