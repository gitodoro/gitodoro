module.exports = (config) => {
  config.set({
    basePath: '../..',
    frameworks: [ 'mocha', 'chai', 'fixture', 'sinon' ],
    files: [
      'build/request.js',
      'build/bundle.js',
      'test/client/**/*.spec.js',
      'build/index.html'
    ],
    preprocessors: {
      'build/*.html': [ 'html2js' ]
    },
    reporters: [ 'mocha' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome' ],
    singleRun: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};

