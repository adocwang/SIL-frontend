import angular             from 'angular';
import dashboardModule     from './dashboard/dashboard.module';

// import settingModule       from './setting/setting.module';


export default angular.module('app.modules', [
  dashboardModule.name,
  // settingModule.name,
]);
