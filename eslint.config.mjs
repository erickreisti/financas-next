// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  // Ignorar pastas de build
  { ignores: [".next/", "out/", "dist/"] },

  // Configuração básica JavaScript
  js.configs.recommended,

  // Configuração TypeScript
  ...tseslint.configs.recommendedTypeChecked,

  // Configuração Next.js
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Configuração Prettier
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },

  // Configurações específicas por tipo de arquivo
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
);
