module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb',
    "eslint:recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "max-len": [
      "error",
      120,
      2,
      {
        "ignoreUrls": true,
        "ignoreComments": false,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-mixed-operators": 0,
    "no-confusing-arrow": 0,
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "import/no-extraneous-dependencies": 0,
    "arrow-body-style": ["warn", "as-needed"],
    "react/sort-comp": 0,
    "no-array-constructor": 0,
    "import/prefer-default-export": 0,
    "react/jsx-no-bind": [2, {
      "ignoreRefs": true
    }],

  },
};
