import angular from 'angular';
import config  from './config';
// import service from './service';
// import List  from './list/';
import Setting  from './setting/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.information', [])
// .filter('filterType', filterType)
// .service('MessageService', service)

// .component('informationList', List)
.component('informationSetting', Setting)
.config(config);
