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

function batchUploadFileCtrl($location, $rootScope, $scope, $state, $timeout, ApiMap, toastr, options) {
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
                    }else{
                        toastr.success('添加成功');
                        $state.reload();
                    }
                }else{
                    toastr.error( data.info );
                }

                //$modalInstance.close();
            }
        }
    });

    // 触发上传
    function uploadFile(e) {
        e.preventDefault();
        $timeout(function() {
            $(e.target).siblings('.dropzone').trigger('click');
        });
    }
}
