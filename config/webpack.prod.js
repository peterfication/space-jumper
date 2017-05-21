var webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    LodashModuleReplacementPlugin = require('lodash-webpack-plugin'),

    commonConfig = require('./webpack.common.js'),
    helpers      = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  debug: false,

  entry: {
    app: [helpers.root('app', 'main.js')],
    vendor: [
      'babel-polyfill',
      'classnames',
      'react',
      'react-dom',
      'react-ga',
      'react-redux',
      'react-select',
      'react-sortable-hoc',
      'react-tap-event-plugin',
      'redux',
    ],
  },

  output: {
    path: helpers.root('build'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/space-jumper',
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name]-[chunkhash].js'),
    new LodashModuleReplacementPlugin({
      path: true,
      flattening: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourcemap: true,
    }),
  ],
});
