import angular   from 'angular';
import {backTop} from './back-top/back-top';
import inlineNav from './inline-nav';

import mcStep from './mc-step';


export default angular.module('app.common.components', [])
.component('backTop', backTop)
.component('inlineNav', inlineNav)
.component('mcStep', mcStep);
;
