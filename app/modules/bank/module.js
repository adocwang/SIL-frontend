import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import List from './list/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.bank', [])
// .filter('filterType', filterType)
.service('BankService', service)

.component('bankList', List)
.config(config);
