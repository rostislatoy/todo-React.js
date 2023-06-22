module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 1,
    'no-plusplus': 'off',
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    'import/named': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/export': 0,
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prefer-destructuring': [
      'off',
      {
        array: false,
        object: false,
      },
    ],
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
};
