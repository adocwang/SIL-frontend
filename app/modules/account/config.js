function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('account', {
        url: '/account',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '账号管理'
    })
    .state('account.list', {
        url: '',
        template: '<account-list></account-list>',
        title: '账号管理'
    })
    .state('account.detail', {
        url: '/detail',
        template: '<account-detail></account-detail>',
        title: '账号管理'
    })
    ;

}

export default Config;
