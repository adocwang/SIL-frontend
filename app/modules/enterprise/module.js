import angular from 'angular';
import config  from './config';
import service from './service';
import filterValue from './filter';
import List  from './list/';
import Detail  from './detail/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.enterprise', [])
.filter('filterValue', filterValue)
.service('EnterpriseService', service)

.component('enterpriseList', List)
.component('enterpriseDetail', Detail)
.config(config);
