import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import List from './list/';

export default angular.module('app.modules.log', [])
// .filter('filterType', filterType)
.service('LogService', service)

.component('logList', List)
.config(config);
