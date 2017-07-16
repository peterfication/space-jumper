var webpack      = require('webpack'),
    webpackMerge = require('webpack-merge'),

    helpers      = require('./helpers'),
    commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: ['babel-polyfill', helpers.root('app', 'main.js')],

  output: {
    path: helpers.root('public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  devServer: {
    contentBase: helpers.root('public'),
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
