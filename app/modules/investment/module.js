import angular from 'angular';
import config  from './config';
// import service from './service';
import List  from './list/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.investment', [])
// .filter('filterType', filterType)
// .service('MessageService', service)

.component('investmentList', List)
.config(config);
