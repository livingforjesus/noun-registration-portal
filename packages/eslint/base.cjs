"use strict";

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  env: { node: true, es2022: true },
  ignorePatterns: ["node_modules", "dist", ".next", "build"]
};
