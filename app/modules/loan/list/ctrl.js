import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, sweet, toastr, $uibModal, LoanService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._sweet = sweet;
    this._toastr = toastr;

    this._service = LoanService;

    this.roleMainStatus = [
      {
        value: '',
        label: '全部'
      },
      {
        value: 1,
        label: '离职'
      },
    ];

    this.enterpriseStateList = [
      {
        value: 1,
        label: '正常'
      },
      {
        value: 2,
        label: '已冻结'
      },
      {
        value: 0,
        label: '未通过筛选'
      },
      {
        value: 3,
        label: '已删除'
      },
    ];

    this.filters = {};

    this.oneAtATime = true;

    this._init();

  }

  _init() {

    this._initFilters();
    this._getList();

  }

  _initFilters() {
    // console.log(this._stateParams);
    const stateParams = this._stateParams;
    // this.pagination.page = +stateParams.page;
    this.filters.role_a_disable = stateParams.role_a_disable || '';
    this.filters.state = stateParams.state? +stateParams.state : void(0);

    this.filters.name = stateParams.name || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;
    params.only_loan_ready = 1;

    this._service.getList(params).then(data => {
      console.log(data);
      this.list = data.enterprises;
      this.pagination.count = data.page_count * this.pagination.pageSize;
    });

  }

  reSearch() {
    let page = 1
    this._location.search({...this._filterEmptyValue(), page});
  }

  switch(key, value) {

    if(!key) {
      return false;
    }

    this.filters[key] = value;

    this.reSearch();
  }


}

export default ListController;
