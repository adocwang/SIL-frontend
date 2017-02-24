import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import Setting  from './setting/';
import Decision from './decision';
import List from './list';
import service from './service';

export default angular.module('app.modules.loan', [])
.service('LoanService', service)
.component('loanSetting', Setting)
.component('loanDecision', Decision)
.component('loanList', List)
.config(config);
