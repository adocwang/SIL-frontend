import angular             from 'angular';
import dashboardModule     from './dashboard/dashboard.module';

import demoModule       from './demo/demo.module';
import messageModule       from './message/module';
import investmentModule       from './investment/module';
import enterpriseModule       from './enterprise/module';
import informationModule       from './information/module';

import personModule         from './person/module';
import accountModule        from './account/module';
import logModule        from './log/module';
import bankModule        from './bank/module';

export default angular.module('app.modules', [
  dashboardModule.name,
  demoModule.name,
  messageModule.name,
  investmentModule.name,
  enterpriseModule.name,
  informationModule.name,
  personModule.name,
  accountModule.name,
  logModule.name,
  bankModule.name,
]);
