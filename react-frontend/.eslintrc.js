module.exports = {
  root: true,
  settings: {
    react: {
      "version": "detect"
    }
  },
  env: {
    "browser" : true,
    "node" : true,
    "es6" : true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "quotes": ["error", "double"],
    "camelcase": [2, { "properties": "always" }],
    "object-curly-spacing": ["error", "always"],
    "no-undef": 2,
    "no-unused-vars": 2
  },
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
};