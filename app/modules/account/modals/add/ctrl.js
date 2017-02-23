export default class Controller {
  constructor($scope, $state, $validation, $uibModalInstance, toastr, AccountService, info, AppSettings, ConfigService) {
    'ngInject';

    this._scope = $scope;
    this._state = $state;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this._service = AccountService;
    this._configService = ConfigService;

    this.roleKey = AppSettings.roleListKey;

    this.info = info;
    this.roleList = [];
    this.bankList = [];

    this.inputInfo = {
      true_name: '',
      phone: '',
      role: ''
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

    this._configService.get(this.roleKey).then(data => {
      if(data) {
        this.roleList = angular.fromJson(data);
      }
    });

    this._service.getBankList().then(data => {
      this.bankList = data;
    });

  }

  assignBranch(item) {
    const resolve = {
      info: function(){
        return item;
      }
    };

    const options = {...branchConfig, resolve};

    this._modal.open( options );
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
