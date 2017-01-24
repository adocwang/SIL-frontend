import angular from 'angular';
import $ from 'jquery';
global.$ = global.jQuery = $;

import 'angular-toastr';
import 'jquery-slimscroll';
import 'angular-slimscroll';
import 'angular-ui-switch';
import ngBlockUi from 'angular-block-ui';
import 'sweetalert';
import 'angular-h-sweetalert';
import Dropzone from 'dropzone';
window.Dropzone = Dropzone;
import 'angular-dropzone';
import 'ngCropper/dist/ngCropper.all';
import 'angular-datepicker';
// import 'angular-xeditable';
import pace from 'pace2';
import 'checklist-model';
import viewer from 'viewerjs';
window.Viewer = viewer;

// TODO: Angular version - https://github.com/andresesfm/angular-underscore-module/blob/master/angular-underscore-module.js
import _ from 'underscore';
window._ = _;
import moment from 'moment';
window.moment = moment;
import 'angular-moment';
import 'moment/locale/zh-cn';

// TODO: https://github.com/Andyczc/angular-validation/commit/051655502558f4d61f6dfc4dc53eed3efdb9e46b
import 'angular-validation';
import 'angular-validation/dist/angular-validation-rule';
import 'angular-validation-match';

import blockUIConfig        from './config/blockUI.config';
import toastrConfig         from './config/toastr.config';
import uibPaginationConfig  from './config/uibPagination.config';
import validationRuleConfig from './config/validationRule.config';
// import {xeditableOptions} from './config/xeditable.config';

import uibModalDecorator from './uibModal.decorator';


export default angular.module('app.core.vendor', [
  // UI widget
  'toastr',
  'ui.slimscroll',
  'uiSwitch',
  'hSweetAlert',
  'blockUI',
  'ngDropzone',
  'datePicker',
  'ngCropper',
  // 'xeditable', // TODO: replace with form-edit directive
  'checklist-model',

  // Utils
  'angularMoment',
  'validation',
  'validation.rule',
  'validation.match'
])
.config(blockUIConfig)
.config(toastrConfig)
.config(uibPaginationConfig)
.config(validationRuleConfig)
// .run(xeditableOptions)
//.decorator('$uibModal', uibModalDecorator)
// .run(xeditableThemes);
