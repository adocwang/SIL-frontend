export default class Pagination {
  constructor($injector) {
    'ngInject';
// console.log($location);
    this._location = $injector.get( '$location');
    this._stateParams = $injector.get( '$stateParams');

    this.pagination = {
      count: 0,
      pageSize: 20
    };

    this._initPage();
  }

  _initPage() {
    let {page} = this._stateParams;
    this.pagination.page = +page || 1;
  }

  _filterEmptyValue() {
    let validFilters = {};
    let value;
    for(let key in this.filters){
      value = this.filters[key];
      if(value !== void(0)) {
        validFilters[key] = value;
      }
    }


    return validFilters;
  }

  reSearch() {
    let page = 1
    this._location.search({...this._filterEmptyValue(), page});
  }

  pageChanged() {
    // console.log(this.location);
    const page = this.pagination.page;

    this._location.search( {...this._filterEmptyValue(), page} );
  }
}
