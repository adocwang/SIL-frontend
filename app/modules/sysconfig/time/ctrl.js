import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, sysconfigService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = sysconfigService;

    this.filters = {};
    this._init();

  }

  _init() {
    this._get();
  }

  
  _get() {
    let params = this._filterEmptyValue();
    params.page = this.pagination.page;

    this._service.list(params).then(data => {
      this.pagination.count = data.count;
      this.pagination.pageSize = data.page_limit;
      this.list = data.logs;
    });
  }

  pageChanged() {
    this._getList();
  }

  reSearch() {
    this._getList();
  }
}

export default ListController;
