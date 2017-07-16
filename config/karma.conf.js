var webpack = require('webpack');

var helpers = require('./helpers');

var includes = [helpers.root('app')]

var options = {
  plugins: [
    'karma-webpack-with-fast-source-maps',
    'karma-jasmine',
    'karma-chrome-launcher',
    'karma-spec-reporter',
  ],
  browsers: ['Chrome'],
  singleRun: false,
  autoWatch: true,
  browserNoActivityTimeout: 100000,
  frameworks: ['jasmine'],
  files: [helpers.root('app', 'spec.index.js')],

  preprocessors: {
    [helpers.root('app', 'spec.index.js')]: ['webpack'],
  },

  reporters: ['spec'],
  specReporter: {
    maxLogLines: 15,
    suppressFailed: false,
    suppressPassed: false,
    suppressSkipped: true,
    showSpecTiming: false,
  },
  webpack: {
    entry: ['babel-polyfill', helpers.root('app', 'main.js')],
    devtool: 'cheap-module-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: includes,
          use: [
            {
              loader: 'babel-loader',
              query: {
                plugins: [
                  'transform-object-rest-spread',
                  'transform-es2015-modules-commonjs',
                  'transform-regenerator',
                ],
                presets: ['react', 'es2015'],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: includes,
          use: [
            {
              loader: 'file-loader',
              options: {
                emitFile: false,
              },
            }
          ]
        },
        {
          test: /\.css$/,
          include: helpers.root('node_modules/react-dates/lib/css/_datepicker.css'),
          use: [
            {
              loader: 'file-loader',
              options: {
                emitFile: false,
              },
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          include: includes,
          use: [
            {
              loader: 'file-loader',
              options: {
                emitFile: false,
              },
            }
          ]
        },
      ],
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    node: {
      fs: "empty",
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'test'),
        },
      })
    ]
  },
  webpackServer: {
    noInfo: true,
  },
};

if (process.env.CI) {
  options.singleRun = true;
  options.autoWatch = false;
}

module.exports = function (config) {
  config.set(options);
};
