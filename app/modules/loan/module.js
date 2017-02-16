import angular from 'angular';
import config  from './config';
import Setting  from './setting/';
import Decision from './decision';
import service from './service';

export default angular.module('app.modules.loan', [])
.service('LoanService', service)
.component('loanSetting', Setting)
.component('loanDecision', Decision)
.config(config);
