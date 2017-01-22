import angular from 'angular';
import config  from './demo.config';
import List  from './list/';

// import demoService      from './services/demo.service';



export default angular.module('app.modules.demo', [])
// .filter('filterType', filterType)

.component('demoList', List)
.config(config);
