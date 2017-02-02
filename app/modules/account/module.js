import angular from 'angular';
import jquery from 'jquery';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import Detail from './detail/';
import List from './list/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.account', [])
// .filter('filterType', filterType)
.service('AccountService', service)

.component('accountList', List)
.component('accountDetail', Detail)
.config(config);
