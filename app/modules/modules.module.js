import angular             from 'angular';
import dashboardModule     from './dashboard/dashboard.module';

import demoModule       from './demo/demo.module';
import messageModule       from './message/module';

import personModule         from './person/module';

export default angular.module('app.modules', [
  dashboardModule.name,
  demoModule.name,
  messageModule.name,
  personModule.name,
]);
