import eslintJs from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import eslintPluginReact from 'eslint-plugin-react'
import sortImports from 'eslint-plugin-simple-import-sort'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: [
      '.commitlintrc.mjs',
      'eslint.config.mjs',
      'packages/mobile/babel.config.js',
      'packages/mobile/metro.config.js',
      'commands',
      '**/dist/'
    ]
  },
  ...tseslint.config(
    {
      languageOptions: {
        globals: globals.browser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          ecmaVersion: 'latest',
          ecmaFeatures: {
            jsx: true
          },
          sourceType: 'module'
        }
      }
    },
    {
      plugins: {
        'simple-import-sort': sortImports
      }
    },
    reactHooks.configs['recommended-latest'],
    eslintJs.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true
          }
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        eqeqeq: 'error',
        'no-console': 'error',
        semi: [2, 'never'],
        'no-multiple-empty-lines': [
          'error',
          {
            max: 2,
            maxEOF: 1
          }
        ],
        'react/react-in-jsx-scope': 'off'
      },

      settings: {
        react: {
          version: '18.3.1'
        }
      }
    }
  )
]
