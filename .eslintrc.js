module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: `react-app`,
  rules: {
    // Possible Errors
    'no-console': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],

    // Stylistic Issues
    indent: ['warn', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'brace-style': ['warn'],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-trailing-spaces': ['warn'],
    'no-unneeded-ternary': ['warn'],
    'comma-spacing': ['warn'],
    'comma-style': ['warn'],
    'comma-dangle': ['warn'],
    'eol-last': ['warn'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'block-spacing': ['warn'],

    // Best Practices
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    curly: ['warn'],

    // React PropTypes
    'react/prop-types': [
      1,
      {
        ignore: ['i18n'],
        customValidators: []
      }
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'ignore'
  }
};
