function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('account', {
        url: '/account',
        //abstract: true,
        template : '<ui-view><account-list></account-list></ui-view>',
        title: '账号管理',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 100,
        }
    })
    .state('account.list', {
        url: '',
        template: '<account-list></account-list>',
        title: '账号列表'
    })
    .state('account.detail', {
        url: '/detail?id',
        template: '<account-detail></account-detail>',
        title: '账号详情'
    })
    ;

}

export default Config;
