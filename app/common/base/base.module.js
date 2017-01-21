import angular         from 'angular';
import baseService     from './base.service';
import baseListCtl     from './baseList.controller';


export default angular.module('app.common.base', [])
.service('baseListCtrl', baseListCtl)
.service('baseService', baseService);
