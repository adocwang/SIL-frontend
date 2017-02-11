export default class Controller {
  constructor($scope, $state, $validation, $uibModalInstance, toastr, BankService, info) {
    'ngInject';

    this._scope = $scope;
    this._state = $state;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this._service = BankService;

    this.info = info;

    this.inputInfo = {
      name: ''
    };

    this.autoCompleteOptions = {
      minimumChars: 1,
      data: function (term) {
        term = term.toUpperCase();
        var match = _.filter(info.agencyList, function (value) {
            return value.startsWith(term);
        });
        return match;
      }
    }

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
    const data = this.inputInfo;
    this._service.add(data).then(data => {
      this._toastr.success('添加成功');
      this.cancel();
      this._state.reload();
    })
  }
}
