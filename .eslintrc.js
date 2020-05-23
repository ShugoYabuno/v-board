module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  // extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'no-console': 'off',
    "prettier/prettier": [
      "error", {
        "singleQuote": true,
        "semi": false,
        "endOfLine": "auto"
      }
    ]
  }
}
