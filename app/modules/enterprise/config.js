function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('enterprise', {
        url: '/enterprise',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '企业分配',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 400,
        }
    })
    .state('enterprise.list', {
        url: '?page&status&name&state&bank_name',
        template: '<enterprise-list></enterprise-list>',
        title: '企业列表',
        sidebarMeta: {
          order: 10
        }
    })
    .state('enterprise.detail', {
        url: '/detail?id',
        template: '<enterprise-detail></enterprise-detail>',
        title: '企业详情',
    })
    ;

}

export default Config;
