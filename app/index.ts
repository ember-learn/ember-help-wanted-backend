require('source-map-support').install();
const path = require('path');
const Application = require('./application').default;

let application = new Application({
  environment: process.env.DENALI_ENV || process.env.NODE_ENV || 'development',
  dir: process.cwd()
});

application.start();

module.exports = application;
