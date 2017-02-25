import angular from 'angular';
import config  from './config';
import service from './service';
import {filterValue, filterDistributeState} from './filter';
import List  from './list/';
import Detail  from './detail/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.enterprise', [])
.filter('filterValue', filterValue)
.filter('filterDistributeState', filterDistributeState)
.service('EnterpriseService', service)

.component('enterpriseList', List)
.component('enterpriseDetail', Detail)
.config(config);
