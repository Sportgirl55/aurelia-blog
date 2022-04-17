import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'jquery/dist/jquery';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))

 // aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
