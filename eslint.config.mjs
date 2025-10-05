// eslint.config.js
// Importa configurações padrão do ESLint para JavaScript
import js from "@eslint/js";

// Importa variáveis globais para diferentes ambientes
import globals from "globals";

// Importa plugins do TypeScript ESLint
import tseslint from "typescript-eslint";

// Importa plugins do Next.js para ESLint
import nextPlugin from "@next/eslint-plugin-next";

// Importa plugins do React para ESLint
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

// Importa plugins do Prettier para ESLint
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

// Exporta configuração ESLint completa com nova sintaxe flat config
export default tseslint.config(
  // ✅ Ignorar pastas de build e node_modules
  { ignores: [".next/", "out/", "dist/", "node_modules/"] },

  // ✅ Configuração JavaScript básica
  js.configs.recommended,

  // ✅ Configuração TypeScript com type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // ✅ Configuração React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules, // ✅ CORREÇÃO: Usar regras recomendadas corretas
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error", // ✅ CORREÇÃO: Regra correta
      "react-hooks/exhaustive-deps": "warn", // ✅ CORREÇÃO: Regra correta
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // ✅ Configuração Next.js
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // ✅ Configuração Prettier
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },

  // ✅ Configurações específicas por tipo de arquivo
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  }
);
