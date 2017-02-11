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
      branch: info.bank && info.bank.id
    };

    this.list = null;


    this._getBankList();

  }

  _getBankList() {
    this._service.list({
      state: 1
    }).then(data => {
      this.list = data;
    });
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
    this._service.set({
      superior_id: this.info.id,
      id: this.inputInfo.branch
    }).then(data => {
      this.cancel();
      this._toastr.success('设置成功');
      this._state.reload();
    });
  }
}
