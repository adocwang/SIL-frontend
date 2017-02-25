import Pagination from '../../../core/components/mcPagination/mc-pagination.class';

import {branchConfig, manageConfig, addConfig} from '../modals';

class ListController extends Pagination {

  constructor($injector, $state, $location, $stateParams, sweet, toastr, $uibModal, EnterpriseService, ProfileService) {
    'ngInject';

    super($injector);

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._sweet = sweet;
    this._toastr = toastr;

    this._service = EnterpriseService;

    this.profile = ProfileService.getInfo();

    this.roleMainStatus = [
      {
        value: '',
        label: '全部'
      },
      {
        value: 1,
        label: '离职'
      },
    ];

    this.enterpriseStateList = [
      {
        value: 1,
        label: '正常'
      },
      {
        value: 2,
        label: '已冻结'
      },
      {
        value: 0,
        label: '未通过筛选'
      },
      {
        value: 3,
        label: '已删除'
      },
    ];

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
    this.filters.role_a_disable = stateParams.role_a_disable || '';
    this.filters.state = stateParams.state? +stateParams.state : void(0);

    this.filters.name = stateParams.name || void(0);

  }
  
  _getList() {

    let params = this._filterEmptyValue();
    // params.pageSize = this.pagination.pageSize;
    params.page = this.pagination.page;

    this._service.getList(params).then(data => {
      console.log(data);
      this.list = data.enterprises;
      this.pagination.count = data.page_count * this.pagination.pageSize;
    });

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

  assign(item) {
    let {bank} = item;
    if (bank && bank.id) {
      const resolve = {
        info: function(){
          return item;
        }
      };

      const options = {...manageConfig, resolve};

      this._modal.open( options );
    } else {
      this._sweet.show({
        title: '请先分配机构',
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: true,
        imageUrl: '/images/common/warning.png'
      }, sure => {
        // if (sure) {
        //   this.careList.splice(index, 1);
        //   this._toastr.success('删除成功！', '提示');
        // } else {
        //   return;
        // }
      });
    }
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
    this.setState(item.id, 3);
  }

  frost(item) {
    this.setState(item.id, 2);
  }

  setState(id, state) {
    this._service.set({id, state}).then(data => {
      this._toastr.success('操作成功');
      this._state.reload();
    });
  }

  // changeManage(type, item) {
  //   let selected = item[type] && ([{id: item[type].userid, name: item[type].name}]) || [];
  //   let options = {
  //     url: '/api/member/list',
  //     min: 1,
  //     max: 1,
  //     title: '选择客户经理',
  //     itemType: '客户经理',
  //     itemUnit: '名',
  //     itemPosition: '',
  //     searchPlaceholder: '请输入姓名搜索',
  //     selectedItems: selected,
  //     params: {},

  //     list: [
  //       {
  //         id: 12,
  //         name: '王乐乐',
  //         avatar: '/images/common/man.png'
  //       },
  //       {
  //         id: 23,
  //         name: '刘立军',
  //         avatar: '/images/common/man.png'
  //       },
  //       {
  //         id: 24,
  //         name: '王明涵',
  //         avatar: '/images/common/man.png'
  //       },
  //     ],

  //     // idKey: 'old_id'
  //   };

  //   this._pickerService.open(options, res => {
  //     if (res.data.length) {
  //       this._changeManage(res.data[0], type, item);
  //     }
  //   });
  // }

  // _changeManage(manage, type, item) {
  //   item[type] = {
  //     userid: manage.id,
  //     name: manage.name
  //   };
  // }


}

export default ListController;
