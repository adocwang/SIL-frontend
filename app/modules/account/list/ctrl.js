import Pagination from '../../../core/components/mcPagination/mc-pagination.class';
import {addConfig} from '../modals';

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

    const stateParams = this._stateParams;
    //this.filters.keyword = stateParams.keyword || void(0);

  }

  
  _getList() {
    // let params = {
    //   phone: this.phone,
    //   true_name: this.trueName,
    //   bank_name: this.bankName,
    //   state: this.state
    // }
    let params = this._filterEmptyValue();
    params.page = this.pagination.page;
    this.pagination.pageSize = 5;

    this._service.list(params).then(data => {
      this.pagination.count = 10;
      this.list = data.users;
    });

  }

  pageChanged() {
    this._getList();
  }

  reSearch() {
    this._getList();
  }

  addUser() {
    let list = this.list;
    const resolve = {
      info: function(){
        return {
          list
        };
      }
    };

    const options = {...addConfig, resolve};

    this._modal.open( options );
  }

}

export default ListController;
