function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('log', {
        url: '/log',
        //abstract: true,
        template : '<ui-view><log-list></log-list></ui-view>',
        title: '日志管理',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 20,
        }
    })
    .state('log.list', {
        url: '',
        template: '',
        title: '日志列表'
    })
    ;

}

export default Config;
