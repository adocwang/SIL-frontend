class DetailController {

  constructor($state, $stateParams, toastr, AccountService, AppSettings, ConfigService) {
    'ngInject';

    this._state = $state;
    this._toastr = toastr;
    this._stateParams = $stateParams;

    this._service = AccountService;
    this._configService = ConfigService;

    this.id = this._stateParams.id;
    this.roleKey = AppSettings.roleListKey;

    this.info = null;

    this._init();
	}

  _init() {
    let params = {
      id: this.id
    };
    this.stateArr = {
      0: '未激活',
      1: '正常',
      2: '已冻结',
      3: '已删除'
    }

    this._configService.get(this.roleKey).then(data => {
      if(data) {
        this.roleList = angular.fromJson(data);
      }
    });

    this._service.get(params).then(data => {
      this.person = data;
    });
  }

  setUser() {
    let params = {
      user_id: this.id,
      new_password: this.person.new_password,
      true_name: this.person.true_name,
      phone: this.person.phone,
      role: this.person.role,
      role_name: this.person.role_name,
      state: this.person.state
    };
    this._service.set(params).then(data => {
        location.href = '/#/account';
    });

  }

}

export default DetailController;