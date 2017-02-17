function demoConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demo', {
        url: '/demo',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: 'DEMO',
        // sidebarMeta: {
        //   icon: 'icon-sidebar_members_ic',
        //   order: 100,
        // }
    })
    .state('demo.list', {
        url: '/list?page&gender&keyword',
        template: '<demo-list></demo-list>',
        title: '列表',
        sidebarMeta: {
          order: 30
        }
    })
    .state('demo.component', {
      url: '/component',
      template: '<demo-component></demo-component>',
      title: 'Component',
      sidebarMeta: {
        order: 10
      }
    })
    .state('demo.access', {
      url: '/access',
      template: '<demo-access></demo-access>',
      title: 'access',
      sidebarMeta: {
        order: 10
      }
    })
    ;

}

export default demoConfig;
