export default function batchUploadDevice($uibModal, $parse, $timeout) {
  'ngInject';

  return {
    restrict: 'EA',
    template: '<div class="hide"></div>',
    //replace: true,
    link: function(scope, element, attrs) {

      var unbind = scope.$on("batchUploadHealthData", function (event, options={}) {
          Dropzone.autoDiscover = false;

          $uibModal.open({
              animation: true,
              templateUrl: 'common/directives/mcBatchUploadHealthData/template.html',
              controller: batchUploadFileCtrl,
              controllerAs: 'healthData',
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

function batchUploadFileCtrl($location, $rootScope, $scope, $timeout, toastr, options) {
  'ngInject';

    var vm = this;

    let id = '', params = '';

    if(options.single) {
      id = options.id + '/';
      params = options.params;
      vm.download_url = '/resource/file/健康数据批量导入模板单人模板.xls';
    }else {
      vm.download_url = '/resource/file/健康数据批量导入模板.xls';
    }

    let url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + `/api/health/${id}uploadHealthData` + params;

    angular.extend(vm, {
        uploadFile: uploadFile,
        //pensionArea: window.pageConf.areaList,
        //pensionInfo: window.pageConf.pensionInfo,
        dropzoneConfig: {
            paramName: options.paramName || 'collect_data',
            //headers: {authorization: $rootScope.AUTHORIZATION_TOKEN},
            url: url,
            method: 'post',
            maxFilesize: 50,
            maxFiles: 2,
            dictFileTooBig: '文件大小不能超过50M',
            uploadMultiple: false,
            autoProcessQueue: true,
            acceptedFiles: 'application/vnd.ms-excel',
            addedfile: function (file) {
                $('#upload_button').attr('disabled', 'disabled').text('上传中');
            },
            success: function (file, data) {
                $rootScope.imgUploadng = false;
                this.removeFile(file);
                $('#upload_button').removeAttr('disabled').text('上传');
                if(data.status == 0){
                    if(data.data.length > 0){
                        toastr.error(data.data);
                    }else{
                        toastr.success('添加成功');
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
