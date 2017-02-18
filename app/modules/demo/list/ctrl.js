import Pagination from '../../../core/components/mcPagination/mc-pagination.class';
import {editConfiguration} from '../modals';

class ListController extends Pagination {

  constructor($injector, $location, $stateParams, $uibModal, AppSettings) {
    'ngInject';

    super($injector);

    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    
    this.genderList = AppSettings.genderList;
    this.filters = {};

    this.start_date = moment();

    this.end_date = moment();
    this.startTimeMaxLimit = moment();
    this.endTimeMaxLimit = moment();

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

    this.list = [{name: 'Lily', gender: 'falman', age: '16'}, {name: 'Li lei', gender: 'man', age: '26'}];
    this.pagination.count = 20;

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

  edit(item) {
    const resolve = {
      info: function(){
        return item;
      }
    };

    const options = {...editConfiguration, resolve};

    this._modal.open( options );
  }


// datepicker
  changeTime(type) {
    let values = {
        minDate: false,
        maxDate: false
    }
    if (type == 'start') {
      this.filters.start_date = this.start_date.format('YYYY-MM-DD');
      this.endTimeMinLimit = this.start_date;
      values.minDate = this.start_date;
      values.maxDate = moment();
    } else {
      this.filters.end_date = this.end_date.format('YYYY-MM-DD');
      this.startTimeMaxLimit = this.end_date;
      values.maxDate = this.end_date;
    }
  }

}

export default ListController;
