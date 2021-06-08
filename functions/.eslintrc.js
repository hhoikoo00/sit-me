module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "object-curly-spacing": ["error", "always"],
    "camelcase": [2, { "properties": "always" }],
    "require-jsdoc": 0,
  },
};
