function demoConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demo', {
        url: '/demo',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: 'DEMO',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 100,
        }
    })
    .state('demo.list', {
        url: '/list?page&gender&keyword',
        template: '<demo-list></demo-list>',
        title: '列表',
        sidebarMeta: {
          order: 30
        }
    })
    ;

}

export default demoConfig;
