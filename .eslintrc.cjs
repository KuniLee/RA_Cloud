module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        "@vue/eslint-config-prettier"
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [],
    rules: {
        'vue/require-prop-types': 'off',
        'vue/multi-word-component-names': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prettier/prettier': ['error', {endOfLine: 'auto'}],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'eol-last': 'error',
        'padding-line-between-statements': [
            'error',
            {blankLine: 'always', prev: '*', next: 'return'},
            {blankLine: 'always', prev: 'iife', next: 'iife'},
            {blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['singleline-const', 'singleline-let', 'singleline-var'],
            },
        ],
    },
};
