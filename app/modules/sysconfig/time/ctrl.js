import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, ConfigService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = ConfigService;

    this.filters = {};
    this._init();

  }

  _init() {
    this._get();
  }

  
  _get() {
    //let params = this._filterEmptyValue();

    this._service.get('refresh_time').then(data => {
      if(typeof(data) == 'string') {
        this.keyValue = data;
      }
    });
  }

  setConfig() {
    const data = {
      key: "refresh_time",
      value: this.keyValue
    };
    this._service.set(data).then(data => {
      this._toastr.success('设置成功');
      this.cancel();
      this._state.reload();
    })
  }
}

export default ListController;
