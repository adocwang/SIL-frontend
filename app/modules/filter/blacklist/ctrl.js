import Pagination from '../../../core/components/mcPagination/mc-pagination.class';
import {addConfig} from '../modals';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, FilterService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = FilterService;

    this.filters = {};

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

    this.filters.name = stateParams.name || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    this._service.getBlackList(params).then(data => {
      console.log(data);
      this.list = data.blacklist;
      this.pagination.count = data.page_count * this.pagination.pageSize;
    });

    // this.list = [
    //             {id: 1, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
    //             {id: 2, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'},
    //           ];
    // this.pagination.count = 20;

  }

  add() {
    const resolve = {
      info: function(){
        return {};
      }
    };

    const options = {...addConfig, resolve};

    this._modal.open( options );
  }
  del(item) {
    const id = item.id;

    
    this._service.delBlackList({id}).then(data => {
      // this._toastr.success('');
      this._toastr.success('删除成功');
      this._state.reload();

    });
  }


}

export default ListController;
