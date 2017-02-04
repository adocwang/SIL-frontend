// export default function batchUploadDevice($uibModal) {
//     return {
//         restrict: 'EA',
//         template: '<div class="hide"></div>',
//         //replace: true,
//         scope: {
//           options: '='
//         },
//         link: function(scope, element) {
//           console.log(scope.options)

//             var unbind = scope.$on("batchUploadHealthData", function (obj) {
//                 Dropzone.autoDiscover = false;
//                 var obj = obj || {};
//                 $uibModal.open({
//                     animation: true,
//                     templateUrl: 'common/directives/mcBatchUploadHealthData/template.html',
//                     controller: batchUploadFileCtrl,
//                     controllerAs: 'healthData',
//                     size: "",
//                     resolve: {}
//                 }).result.then(function () {
//                 }, function () {  });
//             });
//             scope.$on('$destroy', unbind);
//         }
//     };
// }

// function batchUploadFileCtrl($location, $rootScope, $scope, $timeout, toastr) {
//   'ngInject';

//     var vm = this;

//     angular.extend(vm, {
//         uploadFile: uploadFile,
//         //pensionArea: window.pageConf.areaList,
//         //pensionInfo: window.pageConf.pensionInfo,
//         dropzoneConfig: {
//             paramName: 'collect_data',
//             //headers: {authorization: $rootScope.AUTHORIZATION_TOKEN},
//             url: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/health/uploadHealthData',
//             method: 'post',
//             maxFilesize: 50,
//             maxFiles: 2,
//             dictFileTooBig: '文件大小不能超过50M',
//             uploadMultiple: false,
//             autoProcessQueue: true,
//             acceptedFiles: 'application/vnd.ms-excel',
//             addedfile: function (file) {
//                 $('#upload_button').attr('disabled', 'disabled').text('上传中');
//             },
//             success: function (file, data) {
//                 $rootScope.imgUploadng = false;
//                 this.removeFile(file);
//                 $('#upload_button').removeAttr('disabled').text('上传');
//                 if(data.status == 0){
//                     if(data.data.length > 0){
//                         toastr.error(data.data);
//                     }else{
//                         toastr.success('添加成功');
//                     }
//                 }else{
//                     toastr.error( data.info );
//                 }

//                 //$modalInstance.close();
//             }
//         }
//     });

//     // 触发上传
//     function uploadFile(e) {
//         e.preventDefault();
//         $timeout(function() {
//             $(e.target).siblings('.dropzone').trigger('click');
//         });
//     }
// }
