class DetailController {

  constructor($state, toastr, PersonService, AppSettings, ConfigService) {
    'ngInject';

    this._state = $state;
    this._toastr = toastr;

    this._service = PersonService;
    this._configService = ConfigService;

    this.roleKey = AppSettings.roleListKey;

    this._init();
	}

  _init() {
    let params = {
      id: window.localStorage.getItem('SIL_UID')
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
      user_id: window.localStorage.getItem('SIL_UID'),
      new_password: this.person.new_password,
      true_name: this.person.true_name,
      phone: this.person.phone,
      role_name: this.person.role_name,
      role: this.person.role,
      state: this.person.state
    };
    this._service.set(params).then(data => {
        location.href = '/';
    });

  }

}

export default DetailController;