import $ from 'jquery';

import editAvatarCtrl from './ctrl';
// import Dropzone from 'dropzone';

/**
 * @ngInject
 * @description 上传头像
 */
export function mcUploadImage($location, $rootScope, $timeout, toastr, Cropper) {
    return {
        restrict: 'EA',
        templateUrl: 'core/directives/mcUploadImage/upload.html',
        replace: true,
        controller: editAvatarCtrl,
        controllerAs: 'avatarVm',
        scope: {
            url: '=postUrl',
            params: '=imgParams',
            imgName: '=imgName',
            cropOptions: '=',
            imgUrl: '=',
            success: '&',
            error: '&',
            exposeScope: '&',
            editing: '='
        },
        compile: function () {
            return {
                pre: function (scope, elem) {
                  console.log(scope.editing);

                    Dropzone.autoDiscover = false;

                    scope.thumbStart = false;
                    scope.barType = "success";
                    scope.pensionInfo = window.pageConf.pensionInfo;

                    scope.savedAvatar =  () => {
                        let dropzone = angular.element('.dropzone').scope().dropzone.processQueue();
                    };

                    scope.resetUpload = () => {
                        scope.uploaded = false;
                        scope.dynamic = 0;
                    };

                    scope.dropzoneConfig = {
                        paramName: scope.imgName || 'images',
                        headers: {authorization: $rootScope.AUTHORIZATION_TOKEN},
                        url: scope.url,
                        method: 'post',
                        maxFilesize: 2,
                        maxFiles: 1,
                        dictFileTooBig: '文件大小不能超过2M',
                        uploadMultiple: false,
                        autoProcessQueue: false,
                        acceptedFiles: 'image/*',
                        addedfile: file => {
                            scope.resetUpload();
                            angular.element('#JS_avatar_input').scope().onFile(file);

                            scope.$apply(() => {
                              scope.exposeScope({scope});
                            });

                        },
                        uploadprogress: (file, progress) => {
                            scope.imgUploadng = true;

                            scope.$apply(() => {
                                scope.thumbStart = false;
                                scope.dynamic = progress;
                            });
                        },
                        error: function(file, errorMessage) {
                            scope.imgUploadng = false;
                            this.removeFile(file);
                            scope.$apply(() => {
                                scope.thumbStart = false;
                                scope.error(file, errorMessage);
                                toastr.error(errorMessage);
                            });
                        },
                        success: function(file, data) {
                            this.removeFile(file);
                            scope.$apply( () => {

                              scope.thumbStart = false;

                              if( data.status == 0 ){
                                  scope.uploaded = true;
                                  scope.success({file: file, data: data, scope: scope});
                                  // instace.close();
                              }else{
                                  toastr.error(data.info, '错误');
                                  scope.resetUpload();
                              }

                            });
                        }
                    };

                }
            }
        }
    };

}

