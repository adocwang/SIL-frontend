import angular from 'angular';
import config  from './config';
import service from './service';
// import List  from './list/';
import Add from './add/';
import Tips from './tips/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.process', [])
// .filter('filterType', filterType)
.service('ProcessService', service)

.component('processTips', Tips)
.component('processAdd', Add)
.config(config);
