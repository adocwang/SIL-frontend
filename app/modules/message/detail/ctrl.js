class Controller {

  constructor($state, $stateParams, toastr, MessageService) {
    'ngInject';

    this._state = $state;
    this._toastr = toastr;
    this._stateParams = $stateParams;

    this._service = MessageService;

    this.id = this._stateParams.id;

    this.info = null;

    this._get();
  }

  _get() {
    this._service.get(this.id).then(data => {
      this.info = data;
      if (data.state === 0) {
        this._read();
      }
    });
  }

  _read() {
    this._service.set({
      id: this.id,
      state: 1
    }).then(data => {

    });
  }

	delete() {
		this._service.set({
      id: this.id,
      state: 2
    }).then(data => {
      this._toastr.success('删除成功!');
      this._state.go('message.list');
    });
	}
}

export default Controller;