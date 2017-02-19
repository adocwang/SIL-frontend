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

    this.start_date = moment().add(-1, 'days');
    this.filters.time_from = this.start_date.unix();
    this.end_date = moment();
    this.filters.time_to = this.end_date.unix();

    this.startTimeMaxLimit = moment();
    this.endTimeMaxLimit = moment();

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

  // datepicker
  changeTime(type) {
    let values = {
        minDate: false,
        maxDate: false
    }
    if (type == 'start') {
      this.filters.time_from = this.start_date.unix();
      this.endTimeMinLimit = this.start_date;
      values.minDate = this.start_date;
      values.maxDate = moment();
    } else {
      this.filters.time_to = this.end_date.unix();
      this.startTimeMaxLimit = this.end_date;
      values.maxDate = this.end_date;
    }
    this.reSearch();
  }
}

export default ListController;
