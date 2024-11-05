import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: globals.browser,
      },
      plugins: {
        react: pluginReact,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...pluginJs.configs.recommended.rules,
        ...pluginReact.configs.recommended.rules,
      },
    },
    {
      files: ["webpack.config.js"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: globals.node, // Enable Node.js globals for `webpack.config.js`
      },
    },
  ],
};
