import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, MessageService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = MessageService;

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
    // this.filters.gender = +stateParams.gender || void(0);

    this.filters.keyword = stateParams.keyword || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    this._service.getList(params).then(data => {
      console.log(data);
      this.list = data.messages;
      this.pagination.count = data.page_count * this.pagination.pageSize;
    });

    // this.list = [
    //             {id: 1, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
    //             {id: 2, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
    //           ];
    // this.pagination.count = 20;

  }

  toggleAll() {
    if(this.list) {
      this.list.forEach(item => item.checked = this.selectAll);
    }
  }

  checkAll() {
    if(this.list) {
      let uncheckedList = this.list.filter(item => !item.checked);
      let len = uncheckedList.length;

      if(len > 0) {
        this.selectAll = false;
      } else if (len = this.list.length) {
        this.selectAll = true;
      }
    }
  }

  batchMarkedRead() {
    if(this.list) {
      let checkedList = this.list.filter(item => item.checked);

      checkedList.forEach(item => item.isRead = true);
    }
  }

  batchRemove() {
    if(this.list) {
      this.list = this.list.filter(item => !item.checked);

      // checkedList.forEach(item => item.isRead = true);
      this._toastr.success('删除成功!');
      this._state.reload();
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

      this._service.read({ids}).then(data => {
        // this._toastr.success('');
        this.batchMarkedRead();
      });
    }
  }

  delete() {
    const ids = this.getCheckedIds();

    if(ids && ids.length) {
      console.log(ids);
      this._service.delete({ids}).then(data => {
        // this._toastr.success('');
        this.batchRemove();
      });
    }
  }


}

export default ListController;
