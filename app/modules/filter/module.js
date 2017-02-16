import angular from 'angular';
import config  from './config';
import service from './service';
// import List  from './list/';
import Condition from './condition/';
import Blacklist from './blacklist/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.filter', [])
// .filter('filterType', filterType)
.service('FilterService', service)

.component('filterBlacklist', Blacklist)
.component('filterCondition', Condition)
.config(config);
