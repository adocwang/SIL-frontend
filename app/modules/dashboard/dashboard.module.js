import angular          from 'angular';
import {dashboard}      from './dashboard';
import dashboardService from './dashboard.service';


export default angular.module('app.modules.dashboard', [])
// .service('dashboardService', dashboardService)
.component('dashboard', dashboard);
