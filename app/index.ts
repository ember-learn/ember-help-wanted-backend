import 'main-dir';
import * as path from 'path';
import * as SourceMapSupport from 'source-map-support';
import Application from './application';

SourceMapSupport.install();

let application = new Application({
  environment: process.env.DENALI_ENV || process.env.NODE_ENV || 'development',
  dir: process.cwd()
});

application.start();

export default application;
