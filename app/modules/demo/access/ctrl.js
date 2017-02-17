
class ListController {

  constructor($rootScope, $state, toastr, AppSettings, ConfigService) {
    'ngInject';

    this.$state = $state;
    this.staticMenuItems = [];
    this._isMenuCollapsed = true;

    this._service = ConfigService;

    this._scope = $rootScope;
    this._toastr = toastr;

    this.key = AppSettings.accessKey;

    this.roleList = [
      {
        value: 'ROLE_ADMIN',
        name: '总行行长'
      },
      {
        value: 'ROLE_BRANCH_PRESIDENT',
        name: '分行行长'
      },
      {
        value: 'ROLE_END_PRESIDENT',
        name: '支行行长'
      },
      {
        value: 'ROLE_CUSTOMER_MANAGER',
        name: '客户经理'
      }
    ];
    this.getMenuItems();
    this._get();
  }

  _get() {
    this._service.get(this.key).then(data => {
      if(data) {
        this.access = angular.fromJson(data);
      }
    });
  }

  getMenuItems() {

    let states = this.defineMenuItemStates();
    // let menuItems = states.filter(item => item.level == 0 && !(item.accessRoleIds && item.accessRoleIds.indexOf(this._scope.accessControl.role_id) == -1) );
    // let menuItems = states.filter(item => item.level == 0);

    // menuItems.forEach( item => {
    //   var children = states.filter( child => {
    //     return child.level == 1 && child.name.indexOf(item.name) === 0;
    //   });

    //   item.subMenu = children.length ? children : null;

    //   // 用第三级的指定入口替换二级抽象路由
    //   item.subMenu && item.subMenu.forEach( (third, index) => {
    //     if(third.entry) {
    //       let entry = states.filter(x => x.name === third.entry);
    //       if(entry.length) {
    //         item.subMenu[index] = entry[0];
    //       }
    //     }
    //   });

    // });

    // this.list = menuItems.concat(this.staticMenuItems);
    this.list = states;

  }

  getAllStateRefsRecursive(item) {

    return this._iterateSubItems(item);

  }

  defineMenuItemStates() {

    return this.$state.get().filter(item => item.name && item.title)
    //   // .filter(state => {
    //   //   return state.sidebarMeta;
    //   // })
    //   .map(state => {
    //     var meta = state.sidebarMeta;
    //     return {
    //       name: state.name,
    //       title: state.title,
    //       level: (state.name.match(/\./g) || []).length,
    //       order: meta.order,
    //       icon: meta.icon,
    //       stateRef: state.name,
    //       entry: meta.entry,
    //       accessRoleIds: meta.accessRoleIds,
    //     };
    //   })
    //   .sort((a, b) => {
    //     return (a.level - b.level) * 100 + a.order - b.order;
    //   });

  }


  _iterateSubItems(currentItem) {

    let result = [];
    currentItem.subMenu && currentItem.subMenu.forEach(subItem => {
      subItem.stateRef && result.push(subItem.stateRef);
      this._iterateSubItems(subItem);
    });
    return result;

  }

  submit() {
    console.log('submit');
    console.log(this.access);

    this._service.set({
      key: this.key,
      value: angular.toJson(this.access)
    }).then(data => {
      this._toastr.success('添加成功');
    });
  }

}

export default ListController;
