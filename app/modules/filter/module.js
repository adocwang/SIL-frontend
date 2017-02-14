import angular from 'angular';
import config  from './config';
import service from './service';
// import List  from './list/';
// import Add from './add/';
import Blacklist from './blacklist/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.filter', [])
// .filter('filterType', filterType)
.service('FilterService', service)

.component('filterBlacklist', Blacklist)
// .component('processAdd', Add)
.config(config);
