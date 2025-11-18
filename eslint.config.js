import path from 'node:path'

import {includeIgnoreFile} from '@eslint/compat'
import js from '@eslint/js'
import {
  configs,
  plugins,
  rules as airbnbRules,
} from 'eslint-config-airbnb-extended'

import eslintJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import sortImports from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const gitignorePath = path.resolve('.', '.gitignore')

const jsConfig = [
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  airbnbRules.base.importsStrict,
]

const reactConfig = [
  plugins.react,
  plugins.reactA11y,
  ...configs.react.recommended,
  airbnbRules.react.strict,
]

const typescriptConfig = [
  plugins.typescriptEslint,
  ...configs.base.typescript,
  airbnbRules.typescript.typescriptEslintStrict,
  ...configs.react.typescript,
]

export default [
  includeIgnoreFile(gitignorePath),

  {
    ignores: [
      '.commitlintrc.mjs',
      'eslint.config.js',
      'packages/mobile/babel.config.js',
      'packages/mobile/metro.config.js',
      'commands',
      '**/dist/',
    ],
  },

  ...jsConfig,
  ...reactConfig,
  ...typescriptConfig,

  ...tseslint.config(
    {
      languageOptions: {
        globals: globals.browser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          ecmaVersion: 'latest',
          ecmaFeatures: {jsx: true},
          sourceType: 'module',
        },
      },
    },
    {
      plugins: {
        'simple-import-sort': sortImports,
      },
    },
    reactHooks.configs['recommended-latest'],
    eslintJs.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
      rules: {
        'jsx-a11y/control-has-associated-label': [
          'error',
          {
            ignoreElements: ['td', 'th', 'tr', 'input'],
          },
        ],
        'react/no-array-index-key': 'off',
        'import-x/consistent-type-specifier-style': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-no-leaked-render': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/naming-convention': 'off',
        'no-param-reassign': 'off',
        'no-nested-ternary': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        'import-x/order': 'off',
        'consistent-type-specifier-style': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/self-closing-comp': 'error',
        'jsx-quotes': [2, 'prefer-double'],
        'prefer-arrow-callback': ['error'],
        'prefer-template': ['error'],
        'no-unreachable': ['error'],
        'react/jsx-curly-brace-presence': [
          'error',
          {props: 'never', children: 'never'},
        ],
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        '@typescript-eslint/no-explicit-any': 'off',
        'react/jsx-max-props-per-line': [2, {maximum: 2}],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react/display-name': 'off',
        eqeqeq: 'error',
        'no-console': 'error',
        semi: [2, 'never'],
        'no-multiple-empty-lines': [
          'error',
          {
            max: 2,
            maxEOF: 1,
          },
        ],
        'react/react-in-jsx-scope': 'off',
      },

      settings: {
        react: {
          version: '18.3.1',
        },
      },
    }
  ),
]
