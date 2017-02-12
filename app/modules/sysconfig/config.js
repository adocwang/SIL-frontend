function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('sysconfig', {
        url: '/sysconfig',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '系统设置',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 1000,
        }
    })
    .state('sysconfig.time', {
        url: '/time',
        template: '<time-view></time-view>',
        title: '刷新时间设置',
        sidebarMeta: {
          order: 10
        }
    })
    ;

}

export default Config;
