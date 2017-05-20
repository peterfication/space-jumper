var HtmlWebpackPlugin = require('html-webpack-plugin')
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
var webpack = require('webpack')
var helpers = require('./helpers')
var child_process = require('child_process')

var includes = [helpers.root('app'), helpers.root('node_modules', 's2b-react-kit')]

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: includes,
        query: {
          plugins: ['transform-object-rest-spread'],
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        include: includes,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!sass!postcss',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: includes,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        include: includes,
        loader: 'file-loader',
      },
    ],
  },

  postcss: [
    require('autoprefixer'),
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        SPACE_MANAGER_COMMIT_HASH: JSON.stringify(child_process.spawnSync(
          'git', ['rev-parse', 'HEAD']
        ).stdout.toString()),
        SPACE_MANAGER_COMMIT_DATE: JSON.stringify(child_process.spawnSync(
          'git', ['show', '--pretty=%cI']
        ).stdout.toString()),
      },
    }),
    new webpack.BannerPlugin("Copyright Peter Gundel"),
    new HtmlWebpackPlugin({
      template: helpers.root('app', 'index.tmpl.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: 'vendor',
      defaultAttribute: 'async',
    }),
  ],

}
