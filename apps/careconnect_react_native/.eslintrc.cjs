/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "expo",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:security/recommended",
  ],
  plugins: ["react", "react-hooks", "security"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    es2024: true,
    node: true,
  },
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },

  // ✅ ADD THIS
  overrides: [
    {
      files: ["**/*.test.*", "**/*.spec.*"],
      env: {
        jest: true, // ✅ enables describe/it/expect/jest globals
      },
      rules: {
        // In case ESLint still yells about globals
        "no-undef": "off",

        // Optional (only if your tests trigger these):
        // "@typescript-eslint/no-explicit-any": "off",
        // "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],

  ignorePatterns: ["node_modules/", "dist/", "build/", ".expo/", "coverage/"],
};
