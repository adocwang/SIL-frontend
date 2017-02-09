export default function batchUploadDevice($uibModal, $parse, $timeout) {
  'ngInject';

  return {
    restrict: 'EA',
    template: '<div class="hide"></div>',
    //replace: true,
    link: function(scope, element, attrs) {

      var unbind = scope.$on("batchUploadVc", function (event, options={}) {
          Dropzone.autoDiscover = false;

          $uibModal.open({
              animation: true,
              templateUrl: 'common/directives/mcBatchUploadVc/template.html',
              controller: batchUploadFileCtrl,
              controllerAs: 'vm',
              size: "",
              resolve: {
                options: () => options
              }
          }).result.then(function () {
          }, function () {  });
      });
      scope.$on('$destroy', unbind);
    }
  };
}

function batchUploadFileCtrl($location, $uibModal, $uibModalInstance, $rootScope, $scope, $state, $timeout, ApiMap, toastr, options) {
  'ngInject';

    var vm = this;

    let id = '', params = '';

    vm.download_url = ApiMap.investment.downloadTemplate;

    let url = ApiMap.investment.import;

    angular.extend(vm, {
        uploadFile: uploadFile,
        //pensionArea: window.pageConf.areaList,
        //pensionInfo: window.pageConf.pensionInfo,
        dropzoneConfig: {
            paramName: options.paramName || 'file',
            headers: {extra: $rootScope.AUTHORIZATION_TOKEN},
            url: url,
            method: 'post',
            maxFilesize: 50,
            maxFiles: 2,
            dictFileTooBig: '文件大小不能超过50M',
            uploadMultiple: false,
            autoProcessQueue: true,
            acceptedFiles: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            addedfile: function (file) {
                $('#upload_button').attr('disabled', 'disabled').text('上传中');
            },
            success: function (file, data) {
                $rootScope.imgUploadng = false;
                this.removeFile(file);
                $('#upload_button').removeAttr('disabled').text('上传');

                console.log(data);
                if(data.code == 0){
                    if(data.data.errors.length > 0){
                        // toastr.error(data.data);
                        vm.errorList = data.data.errors;
                        showErrorList(data.data);
                        // $modalInstance.close();
                    }else{
                        toastr.success('添加成功');
                    }

                    if(data.data.successCount > 0) {
                        $state.reload();
                    }
                }else{
                    toastr.error( data.info );
                }

                $uibModalInstance.close();
            }
        },
        errorList: null
    });

    function showErrorList(data) {
      $uibModal.open({
          animation: true,
          templateUrl: 'common/directives/mcBatchUploadVc/error.html',
          controller: ErrorListCtrl,
          controllerAs: 'vm',
          size: "",
          resolve: {
            info: () => data
          }
      }).result.then(function () {
      }, function () {  });
    }

    // 触发上传
    function uploadFile(e) {
        e.preventDefault();
        $timeout(function() {
            $(e.target).siblings('.dropzone').trigger('click');
        });
    }
}

function ErrorListCtrl($uibModalInstance, info) {
  'ngInject';

  let error = info.errors;
  if(error) {
    error = error.filter(item => item.data[0] !== null);
  } else {
    error = [];
  }

  this.errorList = error;
  this.count = info.successCount;

  this.cancel = () => {
    $uibModalInstance.close();
  }
}
