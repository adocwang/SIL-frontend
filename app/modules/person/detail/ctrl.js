class DetailController {

  constructor($state, toastr, PersonService) {
    'ngInject';

    this._state = $state;
    this._toastr = toastr;

    this._service = PersonService;

    this._init();
	}

  _init() {
    let params = {
      id: window.localStorage.getItem('SIL_UID')
    };

    this._service.get(params).then(data => {
      this.person = data;
    });
  }

}

export default DetailController;