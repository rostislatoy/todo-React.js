module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 1,
    'react/no-unescaped-entities': 'off',
    'no-else-return': 'off',
    'no-restricted-globals': 'off',
    radix: 'off',
    'prettier/prettier': 'off',
    'react/no-unused-class-component-methods': 'off',
    'lines-between-class-members': 'off',
    'react/no-unused-state': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/sort-comp': 'off',
    'class-methods-use-this': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-no-undef': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-unneeded-ternary': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prefer-stateless-function': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-nested-ternary': 'off',
    'react/prop-types': 'off',
    'no-useless-constructor': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    'import/named': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/export': 0,
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
