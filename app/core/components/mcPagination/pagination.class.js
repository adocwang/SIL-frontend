export default class Pagination {
  constructor($location) {
    'ngInject';
// console.log($location);
    this._location = $location;

    this.pagination = {
      count: 0,
      pageSize: 18
    }
  }

  _filterEmptyValue() {
    let validFilters = {};
    let value;
    for(let key in this.filters){
      value = this.filters[key];
      if(value) {
        validFilters[key] = value;
      }
    }


    return validFilters;
  }

  reSearch() {
    let pageIndex = 1
    this._location.search({...this._filterEmptyValue(), pageIndex});
  }

  pageChanged() {
    // console.log(this.location);

    this._location.search( this._filterEmptyValue() );
  }
}
