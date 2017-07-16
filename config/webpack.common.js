var HtmlWebpackPlugin = require('html-webpack-plugin')
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
var webpack = require('webpack')
var helpers = require('./helpers')
var child_process = require('child_process')

var includes = [helpers.root('app')]

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: includes,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['transform-object-rest-spread'],
              presets: ['react', 'es2015'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: includes,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('autoprefixer')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        include: includes,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        COMMIT_HASH: JSON.stringify(child_process.spawnSync(
          'git', ['rev-parse', 'HEAD']
        ).stdout.toString()),
        COMMIT_DATE: JSON.stringify(child_process.spawnSync(
          'git', ['log', '-1', '--format=%cd', '--date=format:%Y-%m-%d']
        ).stdout.toString()),
      },
    }),
    new webpack.BannerPlugin("Copyright Peter Gundel"),
    new HtmlWebpackPlugin({
      template: helpers.root('app', 'index.tmpl.html'),
      favicon: helpers.root('app', 'favicon.ico'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: 'vendor',
      defaultAttribute: 'async',
    }),
  ],

}
