function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('bank', {
        url: '/bank',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '银行管理',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 30,
        }
    })
    .state('bank.list', {
        url: '',
        template: '<bank-list></bank-list>',
        title: '银行列表',
        sidebarMeta: {
          order: 10
        }
    })

}

export default Config;
