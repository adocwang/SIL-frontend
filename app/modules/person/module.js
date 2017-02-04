import angular from 'angular';
import bootstrap from 'bootstrap';
import config  from './config';
import service from './service';
import Detail from './detail/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.person', [])
// .filter('filterType', filterType)
.service('PersonService', service)

.component('personDetail', Detail)
.config(config);
