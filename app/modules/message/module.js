import angular from 'angular';
import config  from './config';
import service from './service';
import List  from './list/';
import Detail from './detail/';

// import demoService      from './services/demo.service';




export default angular.module('app.modules.message', [])
// .filter('filterType', filterType)
.service('MessageService', service)

.component('messageList', List)
.component('messageDetail', Detail)
.config(config);
