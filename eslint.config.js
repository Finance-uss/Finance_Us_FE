import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 문법 사용
      globals: globals.browser, // 브라우저 전역 변수 사용
      parserOptions: {
        ecmaVersion: 'latest', // 최신 ECMAScript 문법 사용
        ecmaFeatures: { jsx: true }, // JSX 문법 사용
        sourceType: 'module', // ES 모듈 사용
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier, // Prettier 플러그인 추가
    },
    extends: [
      'eslint:recommended', // 기본 ESLint 규칙
      'plugin:react/recommended', // React 추천 규칙
      'plugin:react-hooks/recommended', // React Hooks 추천 규칙
      'prettier', // Prettier 규칙을 ESLint와 통합
      'plugin:prettier/recommended', // Prettier 플러그인의 추천 규칙
    ],
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Prettier 규칙을 오류로 표시
    },
  },
]
