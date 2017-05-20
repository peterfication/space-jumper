module.exports = {
  extends: 'airbnb',

  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },

  ecmaFeatures: {
    jsx: true,
    modules: true,
  },

  env: {
    browser: true,
    commonjs: true,
    jasmine: true,
  },

  // View link below for react rules documentation
  // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
  rules: {

    // Added by store2be

    semi: [2, 'never'],
    'no-multi-spaces': 1,
    'key-spacing': [1, { mode: 'strict' }],
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'react/no-unused-prop-types': 1,
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.js'] }],
    'comma-dangle': [1, 'always-multiline'],
    'object-curly-spacing': [1, 'always'],
    'max-len': [1, 100],
    'react/style-prop-object': 0, // Applies for non-HTML components too, which we don't want
    'jsx-a11y/no-static-element-interactions': 0, // causes a lot of styling difficulties
    'jsx-a11y/label-has-for': 0,
    'no-console': 2,
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    react: {
      pragma: 'React',
      version: '0.15',
    },
  },
}
