module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'object-curly-spacing': ['warn', 'always'],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    // 'max-len': [
    //   'error',
    //   {
    //     code: 100,
    //     ignoreStrings: true,
    //     ignoreTemplateLiterals: true,
    //     ignoreComments: true,
    //   },
    // ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'spaced-comment': ['error', 'always', {exceptions: ['-', '+']}],
    'consistent-return': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/destructuring-assignment': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/tests/**/*',
        ],
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
