import angular         from 'angular';
import imgLazyLoad     from './imgLazyLoad.directive';
import keyEvent        from './keyEvent.directive';
// import echarts         from './echarts';
import formEditable    from './form-editable';
import filterList      from './filter-list';
import resizable       from './resizable.directive';
import emptyTip        from './emptyTip.directive';
import mcBatchUploadHealthData from './mcBatchUploadHealthData'


export default angular.module('app.common.directives', [
  // echarts.name
])
.directive('imgLazyLoad', imgLazyLoad)
.directive('keyEvent', keyEvent)
.directive('formEditable', formEditable)
.directive('filterList', filterList)
.directive('resizable', resizable)
.directive('emptyTip', emptyTip)
.directive('mcBatchUploadHealthData', mcBatchUploadHealthData)
