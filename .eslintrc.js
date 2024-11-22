module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "expo", // Expo-specific linting rules
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"], // Built-in modules and third-party dependencies
          ["internal"], // Internal modules (your project files)
          ["parent", "sibling", "index"], // Parent, sibling, and index files
          ["object"], // Side-effect imports
          ["type"], // Type imports
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "expo/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
