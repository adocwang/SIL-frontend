import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, AccountService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = AccountService;

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
    this.filters.gender = +stateParams.gender || void(0);

    this.filters.keyword = stateParams.keyword || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    // this._service.getList(params).then(data => {
    //   this.list = data.data;
    // });

    this.list = [
                {id: 1, name: '测试', phone: '123455678', roleName: '管理员', status: '未激活', backName: '民生银行'},
                {id: 1, name: '测试', phone: '123455678', roleName: '管理员', status: '未激活', backName: '民生银行'}
                ];
    this.pagination.count = 20;

  }


}

export default ListController;
