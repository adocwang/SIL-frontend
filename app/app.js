import $          from 'jquery';
import angular    from 'angular';
import appCore    from './core/core.module';
import appCommon  from './common/common.module';
import appModules from './modules/modules.module'
import './templates';

// window.$ = require('jquery');

angular.module('app', [
  'app.templates',

  appCore.name,
  appCommon.name,
  appModules.name
]);

