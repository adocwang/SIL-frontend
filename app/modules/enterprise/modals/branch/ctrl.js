export default class Controller {
  constructor($scope, $state, $validation, $uibModalInstance, toastr, EnterpriseService, info) {
    'ngInject';

    this._scope = $scope;
    this._state = $state;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this._service = EnterpriseService;

    this.info = info;

    this.inputInfo = {
      branch: info.bank && info.bank.id
    };

    this.list = null;


    this._getBankList();

  }

  _getBankList() {
    this._service.getBankList().then(data => {
      // console.log(data);
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
    // console.log('submit')
    this._service.set({
      id: this.info.id,
      bank_id: this.inputInfo.branch
    }).then(data => {
      this.cancel();
      this._toastr.success('设置成功');
      this._state.reload();
    });
  }
}
