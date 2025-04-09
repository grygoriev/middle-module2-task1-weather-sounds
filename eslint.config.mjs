import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "webpack.config.*.js",
    ],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
    },
  },
];