import angular from 'angular';
import config  from './config';
import Setting  from './setting/';


export default angular.module('app.modules.loan', [])
.component('loanSetting', Setting)
.config(config);
