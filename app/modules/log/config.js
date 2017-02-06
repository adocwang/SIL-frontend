function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('log', {
        url: '/log',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '日志管理',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 20,
        }
    })
    .state('log.list', {
        url: '',
        template: '<log-list></log-list>',
        title: '日志列表',
        sidebarMeta: {
          order: 10
        }
    })
    ;

}

export default Config;
