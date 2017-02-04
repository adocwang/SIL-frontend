function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('assign', {
        url: '/assign',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '企业分配',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 400,
        }
    })
    .state('assign.list', {
        url: '?page',
        template: '<assign-list></assign-list>',
        title: '企业列表',
        sidebarMeta: {
          order: 10
        }
    })
    ;

}

export default Config;
