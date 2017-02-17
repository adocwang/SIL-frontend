function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('filter', {
      url: '/filter',
      abstract: true,
      template : '<ui-view></ui-view>',
      title: '企业筛选',
      sidebarMeta: {
        icon: 'icon-sidebar_members_ic',
        order: 500,
      }
    })
    .state('filter.blacklist', {
      url: '?page&name',
      template: '<filter-blacklist></filter-blacklist>',
      title: '黑名单',
      sidebarMeta: {
        order: 30
      }
    })
    .state('filter.condition', {
      url: '/condition',
      template: '<filter-condition></filter-condition>',
      title: '准入条件',
      sidebarMeta: {
        order: 50
      }
    })
    // .state('filter.add', {
    //   url: '/add?id',
    //   template: '<filter-add></filter-add>',
    //   title: '添加黑名单',
    //   sidebarMeta: {
    //     order: 30
    //   }
    // })
    ;

}

export default Config;
