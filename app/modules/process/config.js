function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('process', {
        url: '/process',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '贷款流程',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 600,
        }
    })
    .state('process.tips', {
        url: '?page',
        template: '<process-tips></process-tips>',
        title: '提示话术',
        sidebarMeta: {
          order: 30
        }
    })
    .state('process.add', {
      url: '/add?id',
      template: '<process-add></message-add>',
      title: '添加话术',
      sidebarMeta: {
        order: 30
      }
    })
    ;

}

export default Config;
