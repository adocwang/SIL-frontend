import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, LogService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = LogService;

    this.filters = {};
    this._init();

  }

  _init() {
    this._initFilters();
    this._getList();
  }

  _initFilters() {

    const stateParams = this._stateParams;
    //this.filters.keyword = stateParams.keyword || void(0);

  }

  
  _getList() {
    let params = this._filterEmptyValue();
    params.page = this.pagination.page;
    this.pagination.pageSize = 5;

    // this._service.list(params).then(data => {
    //   this.pagination.count = 10;
    //   this.list = data.users;
    // });
    this.pagination.count = 10;
    this.list = [{
      time: '2016-08-12',
      module: 'test',
      action: 'action',
      params: 'test=test',
      person: 'Cesc'
    }];

  }

  pageChanged() {
    this._getList();
  }

  reSearch() {
    this._getList();
  }
}

export default ListController;
