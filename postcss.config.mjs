// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ Plugin correto para Tailwind CSS v4
    autoprefixer: {},
  },
};
