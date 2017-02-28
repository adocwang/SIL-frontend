import Pagination from '../../../core/components/mcPagination/mc-pagination.class';
import {addConfig} from '../modals';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, InvestmentService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._service = InvestmentService;

    this.filters = {};

    this.agencyList = [];

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

    this.filters.name = stateParams.name || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    this._service.getList(params).then(data => {
      if(data instanceof Array) {
        this.list = data;
      } else {
        // this._formatAgency(data);
        this.list = data.vc_companies;
        this.pagination.count = data.page_count * this.pagination.pageSize;
      }
    });

    // this.list = [
    //             {id: 1, agency: '投资机构名称名称', sub_company: '投资子公司名称'},
    //             {id: 1, agency: '投资机构名称名称', sub_company: '投资子公司名称'},
    //             ];
    // this.pagination.count = 20;

  }

  _formatAgency(data) {
    // const tmpArr = [];
    // _.each(data, item => {
    //   tmpArr.push(item.vc_name);
    // });

    // this.agencyList = _.uniq(tmpArr)
  }

  changeAgency() {
    if (this.filters.agency === null) {
      this.filters.agency = '';
    }
  }

  addCompany() {
    let agencyList = this.agencyList;
    const resolve = {
      info: function(){
        return {
          agencyList
        };
      }
    };

    const options = {...addConfig, resolve};

    this._modal.open( options );
  }

  set(id, state) {
    this._service.set({
      id,
      state
    }).then(data => {
      this._toastr.success('操作成功');
      this._state.reload();
    });
  }

  delete(item) {
    this.set(item.id, 3);
  }
  deleteCancel(item) {
    this.set(item.id, 1);
  }


}

export default ListController;
