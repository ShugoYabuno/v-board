module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    // "prettier-plugin-tailwind",
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    semi: [2, "never"],
    quotes: [2, "double"],
    "no-console": "off",
    "no-unused-vars": "off",
    "vue/html-closing-bracket-newline": [2, { multiline: "never" }],
  },
}
