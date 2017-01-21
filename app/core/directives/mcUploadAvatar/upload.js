import $ from 'jquery';

import editAvatarCtrl from './ctrl';
// import Dropzone from 'dropzone';

/**
 * @ngInject
 * @description 上传头像
 */
export function mcUploadAvatar($location, $rootScope, $timeout, toastr, Cropper) {
    return {
        restrict: 'EA',
        templateUrl: 'core/directives/mcUploadAvatar/upload.html',
        replace: true,
        controller: editAvatarCtrl,
        controllerAs: 'avatarVm',
        scope: {
            url: '=postUrl',
            params: '=imgParams',
            imgName: '=imgName',
            cropOptions: '=',
            imgUrl: '=',
            isEditing: '=',
            success: '&',
            error: '&',
            exposeScope: '&'
        },
        compile: function () {
            return {
                pre: function (scope, elem) {
                  console.log(scope.isEditing)

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

                            // 先上传
                            // if( !file ) return false;
                            // var cSize = file.size / 1024 / 1024;
                            // if( cSize > this.options.maxFilesize ){
                            //     var error_msg = "图片大小不能超过5M噢~";
                            //     toastr.error( error_msg );
                            // };


                            scope.resetUpload();
                            angular.element('#JS_avatar_input').scope().onFile(file);

                            scope.$apply(() => {
                              scope.exposeScope({scope});
                            });

                        },
                        // uploadprogress: function (file, progress) {

                        //     scope.$apply(function () {
                        //         scope.dynamic = progress;
                        //     });

                        // },
                        // error: function (file, errorMessage) {

                        //     scope.$parent.isCrop = false;

                        //     this.removeFile(file);
                        //     scope.$apply(function () {
                        //         scope.error(file, errorMessage);
                        //         toastr.error(errorMessage);
                        //     });
                        // },

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


                                // if( data.status == 0 ){
                                //     scope.uploaded = true;
                                //     scope.success({file: file, data: data, scope: scope});

                                //     scope.$parent.isCrop = true;

                                //     // 图片裁剪
                                //     scope.resetUpload();
                                //     angular.element('#JS_avatar_input').scope().onFile(file);


                                // }else{
                                //     toastr.error(data.info, '错误');
                                //     scope.resetUpload();
                                //     scope.$parent.isCrop = false;
                                // }

                            });
                        }
                    };

                }
            }
        }
    };

}

