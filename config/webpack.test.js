var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')
var glob = require('glob').sync

var specs = glob(helpers.root('app', '**/*.spec.js'))

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval',

  entry: specs,

  output: {
    path: helpers.root('build'),
    filename: 'tests-bundle.js',
    publicPath: '/',
  },

  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
});
