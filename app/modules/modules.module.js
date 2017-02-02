import angular             from 'angular';
import dashboardModule     from './dashboard/dashboard.module';

import demoModule       from './demo/demo.module';
import messageModule       from './message/module';
import investmentModule       from './investment/module';
import assignModule       from './assign/module';

import personModule         from './person/module';
import accountModule        from './account/module';

export default angular.module('app.modules', [
  dashboardModule.name,
  demoModule.name,
  messageModule.name,
  investmentModule.name,
  assignModule.name,
  personModule.name,
  accountModule.name,
]);
