"use strict";

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve("./base.cjs", { paths: [__dirname] })],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "unused-imports"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_"
          }
        ]
      }
    }
  ]
};
