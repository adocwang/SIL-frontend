import angular               from 'angular';
import DatePickerDirective   from './mcDatePicker/datepicker';
import {mcUploadAvatar}      from './mcUploadAvatar/upload';
import {mcUploadImage}  from './mcUploadImage/upload';

export default angular.module('app.core.directives', [])
  .directive('mcDatepicker', DatePickerDirective)
  .directive('mcUploadAvatar', mcUploadAvatar)
  .directive('mcUploadImage', mcUploadImage)
