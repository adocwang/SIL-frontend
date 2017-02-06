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
      main: info.role_a && info.role_a.id,
      vice: info.role_b && info.role_b.id
    };

    this.list = null;

    this._init();

  }

  _init() {
    this._getUserList();
  }

  _getUserList() {
    this._service.getUserList({state: 1}).then(data => {
      this.list = data.users.filter( item => {console.log(item); return item.role == 'ROLE_CUSTOMER_MANAGER'} );
    })
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
      role_a_id: this.inputInfo.main,
      role_b_id: this.inputInfo.vice
    }).then(data => {
      this.cancel();
      this._toastr.success('设置成功');
      this._state.reload();
    });
  }
}
