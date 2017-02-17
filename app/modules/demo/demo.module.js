import angular from 'angular';
import config  from './demo.config';
import List  from './list/';
import Component from './component';
import Access from './access';

// import demoService      from './services/demo.service';



export default angular.module('app.modules.demo', [])
// .filter('filterType', filterType)

.component('demoList', List)
.component('demoComponent', Component)
.component('demoAccess', Access)
.config(config);
