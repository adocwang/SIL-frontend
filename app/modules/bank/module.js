import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import List from './list/';
import {ngBaiduMap} from 'angular-baidu-map';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.bank', [ngBaiduMap])
// .filter('filterType', filterType)
.service('BankService', service)

.component('bankList', List)
.config(config)
.config(['mapScriptServiceProvider', function(provider) {
    provider.setKey('8BEaSdo8E7VEHjM0pxWs8gIsHhkDlOOW');
}])
;
