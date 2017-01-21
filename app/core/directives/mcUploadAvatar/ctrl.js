import angular from 'angular';

class editAvatarCtrl {
  constructor ($scope, $timeout, Cropper, AppSettings) {
    'ngInject';

    this._scope = $scope;
    this._timeout = $timeout;
    this._Cropper = Cropper;


    let options = angular.merge({}, {
        maximize: true,
        preview: '.preview-avatar div',
        // responsive: false,
        aspectRatio: 1 / 1,
        crop: dataNew => {
          dataNew.x = dataNew.x < 0 ? 0 : dataNew.x;
          dataNew.y = dataNew.y < 0 ? 0 : dataNew.y;

          this._timeout(() => {
            this._scope.data = dataNew;
          });
          // console.log($scope.data);
        }
      }, AppSettings.cropOptions, this._scope.cropOptions);

    angular.extend($scope, {
        proportion: 140/180,
        onFile: this.onFile.bind(this),
        preview: {},
        cropper: {},
        cropperProxy: 'cropper.first',
        file: '',
        data: '',
        showEvent: 'show',
        hideEvent: 'hide',
        options: options
    });
    // this._Dropzone = Dropzone;
  }

    // ------------------ method -------------------------

  close(){
      // $modalInstance.close();
  }

  selectFile(){
      let form = angular.element('.dropzone');
      this.resetSelect( form );
      form.trigger('click');
  }

  resetSelect( form ){
      form.scope().dropzone.removeAllFiles();
  }

  /**
   * Method is called every time file input's value changes.
   * Because of Angular has not ng-change for file inputs a hack is needed -
   * call `angular.element(this).scope().onFile(this.files[0])`
   * when input's event is fired.
   */
  onFile(blob) {
    this._Cropper.encode((this._scope.file = blob)).then(dataUrl => {
      this._scope.dataUrl = dataUrl;
      (this._scope.preview || (this._scope.preview = {})).dataUrl = dataUrl;
      this._timeout(this.showCropper.bind(this));  // wait for $digest to set image's src
      this._timeout(this.hideCropper.bind(this));
    });
  };


  /**
   * Showing (initializing) and hiding (destroying) of a cropper are started by
   * events. The scope of the `ng-cropper` directive is derived from the scope of
   * the controller. When initializing the `ng-cropper` directive adds two handlers
   * listening to events passed by `ng-cropper-show` & `ng-cropper-hide` attributes.
   * To show or hide a cropper `$broadcast` a proper event.
   */
  showCropper() {
   this._scope.$broadcast(this._scope.showEvent);
  }
  hideCropper() {
   this._scope.$broadcast(this._scope.hideEvent);
  }

}

export default editAvatarCtrl;
