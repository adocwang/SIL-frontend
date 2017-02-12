import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import TimeView from './time/';

export default angular.module('app.modules.sysconfig', [])
// .filter('filterType', filterType)
.service('sysconfigService', service)

.component('timeView', TimeView)
.config(config);
