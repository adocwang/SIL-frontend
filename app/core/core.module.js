import angular from 'angular';
import 'angular-ui-bootstrap';
import 'angular-ui-router';

import constants         from './core.constants';
import config            from './core.config'
import run               from './core.run';
import configProvider    from './core.configProvider';

import directivesModule  from './directives/directives.module';
import componentsModule  from './components/components.module';
import serviceModule     from './services/service.module';
import vendorModule      from './vendor/vendor.module';


export default angular.module('app.core', [
  'ui.router',
  'ui.bootstrap',

  directivesModule.name,
  componentsModule.name,
  serviceModule.name,
  vendorModule.name
])
.constant('AppSettings', constants)
.provider('coreConfig', configProvider)
.config(config)
.run(run);
