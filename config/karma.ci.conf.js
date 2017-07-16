var webpack = require('webpack');

var helpers = require('./helpers');

var includes = [helpers.root('app')]

var options = {
  plugins: [
    'karma-jasmine',
    'karma-chrome-launcher',
    'karma-spec-reporter',
  ],
  browsers: ['Chrome'],
  singleRun: false,
  autoWatch: true,
  browserNoActivityTimeout: 100000,
  frameworks: ['jasmine'],
  files: [
    helpers.root('node_modules', 'babel-polyfill', 'dist', 'polyfill.js'),
    { pattern: helpers.root('build', 'tests-bundle.js'), watched: true },
  ],

  preprocessors: {
    [helpers.root('app', '**', '*.spec.js')]: [],
  },

  reporters: ['spec'],
  specReporter: {
    maxLogLines: 15,
    suppressFailed: false,
    suppressPassed: false,
    suppressSkipped: true,
    showSpecTiming: false,
  },
};

if (process.env.CI) {
  options.singleRun = true;
  options.autoWatch = false;
}

module.exports = function (config) {
  config.set(options);
};

