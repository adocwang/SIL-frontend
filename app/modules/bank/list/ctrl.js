import Pagination from '../../../core/components/mcPagination/mc-pagination.class';
import {branchConfig, addConfig, mapConfig} from '../modals';


class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, BankService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = BankService;

    this.filters = {};

    this.oneAtATime = true;

    this._init();
    this.bankStateList = [
      {
        value: 1,
        label: '正常'
      },
      {
        value: 3,
        label: '已删除'
      },
    ];
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
    //params.page = this.pagination.page;
    //this.pagination.pageSize = 5;
    this._service.list(params).then(data => {
      //this.pagination.count = 10;
      this.list = data;
    });

  }

  pageChanged() {
    this._getList();
  }

  reSearch() {
    this._getList();
  }

  switch(key, value) {

    if(!key) {
      return false;
    }

    this.filters[key] = value;

    this.reSearch();
  }

  addBank() {
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

  setMap(item) {
    const resolve = {
      info: function(){
        return item;      
      }
    };

    const options = {...mapConfig, resolve};

    this._modal.open( options );
  }

  delete(item) {
    this._service.set({
      id: item.id,
      state: 3
    }).then(data => {
      this._toastr.success('删除成功');
      this._state.reload();
    });
  }

  redelete(item) {
    this._service.set({
      id: item.id,
      state: 1
    }).then(data => {
      this._toastr.success('取消删除成功');
      this._state.reload();
    });
  }


  assignBranch(item) {
    const resolve = {
      info: function(){
        return item;
      }
    };

    const options = {...branchConfig, resolve};

    this._modal.open( options );
  }


}

export default ListController;
