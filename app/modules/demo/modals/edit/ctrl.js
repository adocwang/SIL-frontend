export default class editController {
  constructor($scope, $validation, $uibModalInstance, toastr, info) {
    'ngInject';

    this._scope = $scope;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this.info = info;

  }

  

  cancel() {
    this._modalInstance.close();
  }

  submit(form) {
    //验证表单
    this._validationProvider.validate(form).success(() => {
      this.saveFunc();
    });
  }

  saveFunc() {
    
  }
}
