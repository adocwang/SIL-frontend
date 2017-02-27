function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('bank', {
        url: '/bank',
        //abstract: true,
        template : '<ui-view><bank-list></bank-list></ui-view>',
        title: '机构管理',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 10,
        }
    })
    // .state('bank.list', {
    //     url: '',
    //     template: '<bank-list></bank-list>',
    //     title: '机构列表'
    // })

}

export default Config;
