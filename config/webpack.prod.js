var webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    LodashModuleReplacementPlugin = require('lodash-webpack-plugin'),

    commonConfig = require('./webpack.common.js'),
    helpers      = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  entry: {
    app: [helpers.root('app', 'main.js')],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-ga',
      'react-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-saga',
    ],
  },

  output: {
    path: helpers.root('build'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/space-jumper',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
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
