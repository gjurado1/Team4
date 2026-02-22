module.exports = [
  {
    files: ["src/**/*.cjs", "test/**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-undef": "error"
    }
  },
  {
    files: ["test/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  }
];
