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

    this.agencyList = [
      {
        id: 1, 
        name: '红杉资本'
      },
      {
        id: 2, 
        name: '真格基金'
      },
      {
        id: 3, 
        name: 'IDG'
      },
      {
        id: 4, 
        name: '同渡创投'
      },
    ];

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
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    this._service.getList(params).then(data => {
      if(!data instanceof Array) {
        data = [];
      }
      this.list = data;
      // this.pagination.count = 1;
    });

    // this.list = [
    //             {id: 1, agency: '投资机构名称名称', sub_company: '投资子公司名称'},
    //             {id: 1, agency: '投资机构名称名称', sub_company: '投资子公司名称'},
    //             ];
    // this.pagination.count = 20;

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


}

export default ListController;
