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

    };

    // this._service.get(params).then(data => {
    //   this.person = data.data;
    // });

    this.person = {
      name: 'test',
    }

  }

}

export default DetailController;