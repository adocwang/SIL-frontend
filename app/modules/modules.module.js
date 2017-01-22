import angular             from 'angular';
import dashboardModule     from './dashboard/dashboard.module';

import demoModule       from './demo/demo.module';


export default angular.module('app.modules', [
  dashboardModule.name,
  demoModule.name,
]);
