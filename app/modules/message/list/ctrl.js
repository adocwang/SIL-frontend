import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $location, $stateParams, $uibModal, AppSettings) {
    'ngInject';

    super($injector);

    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

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

    this.list = [
                {id: 1, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
                {id: 2, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
              ];
    this.pagination.count = 20;

  }

  toggleAll() {
    if(this.list) {
      this.list.forEach(item => item.checked = this.selectAll);
    }
  }

  getCheckedIds() {
    if(this.list) {
      let checkedList = this.list.filter(item => item.checked);

      return checkedList.map(item => item.id);
    }

    return false;
  }

  markedRead() {
    const ids = this.getCheckedIds();

    if(ids && ids.length) {
      console.log(ids);
    }
  }

  delete() {
    const ids = this.getCheckedIds();

    if(ids && ids.length) {
      console.log(ids);
    }
  }


}

export default ListController;
