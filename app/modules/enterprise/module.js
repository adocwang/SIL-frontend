import angular from 'angular';
import config  from './config';
import service from './service';
import List  from './list/';
import Detail  from './detail/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.enterprise', [])
// .filter('filterType', filterType)
.service('EnterpriseService', service)

.component('enterpriseList', List)
.component('enterpriseDetail', Detail)
.config(config);
