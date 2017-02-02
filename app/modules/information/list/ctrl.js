import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

import {branchConfig, manageConfig} from '../modals';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, toastr, $uibModal, PickerService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._toastr = toastr;

    this._pickerService = PickerService;

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

    // this._service.getList(params).then(data => {
    //   this.list = data.data;
    // });

    this.list = [
                {id: 1, company: '投资机构名称名称', company_address: '四川 成都', manage_a: {userid: 23, name: '刘立军'}, manage_b: {userid: 24, name: '王明涵'}},
                {id: 2, company: '投资机构名称名称', company_address: '广东 深圳', manage_a: {userid: 23, name: '刘立军'}, manage_b: {userid: 24, name: '王明涵'}},
                {id: 3, company: '投资机构名称名称', company_address: '广东 深圳', manage_a: null, manage_b: {userid: 24, name: '王明涵'}},
                {id: 4, company: '投资机构名称名称', company_address: '广东 深圳', manage_a: null, manage_b: null},
                ];
    this.pagination.count = 20;

  }

  assign(item) {
    const resolve = {
      info: function(){
        return item;
      }
    };

    const options = {...manageConfig, resolve};

    this._modal.open( options );
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

  changeManage(type, item) {
    let selected = item[type] && ([{id: item[type].userid, name: item[type].name}]) || [];
    let options = {
      url: '/api/member/list',
      min: 1,
      max: 1,
      title: '选择客户经理',
      itemType: '客户经理',
      itemUnit: '名',
      itemPosition: '',
      searchPlaceholder: '请输入姓名搜索',
      selectedItems: selected,
      params: {},

      list: [
        {
          id: 12,
          name: '王乐乐',
          avatar: '/images/common/man.png'
        },
        {
          id: 23,
          name: '刘立军',
          avatar: '/images/common/man.png'
        },
        {
          id: 24,
          name: '王明涵',
          avatar: '/images/common/man.png'
        },
      ],

      // idKey: 'old_id'
    };

    this._pickerService.open(options, res => {
      if (res.data.length) {
        this._changeManage(res.data[0], type, item);
      }
    });
  }

  _changeManage(manage, type, item) {
    item[type] = {
      userid: manage.id,
      name: manage.name
    };
  }


}

export default ListController;
