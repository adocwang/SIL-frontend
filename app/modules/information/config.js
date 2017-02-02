function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('information', {
        url: '/information',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '企业信息',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 500,
        }
    })
    // .state('information.list', {
    //     url: '',
    //     template: '<information-list></information-list>',
    //     title: '企业列表',
    //     sidebarMeta: {
    //       order: 10
    //     }
    // })
    // .state('information.detail', {
    //     url: '/detail?id',
    //     template: '<information-detail></information-detail>',
    //     title: '企业列表',
    //     sidebarMeta: {
    //       order: 20
    //     }
    // })
    .state('information.setting', {
        url: '/setting',
        template: '<information-setting></information-setting>',
        title: '采集设置',
        sidebarMeta: {
          order: 30
        }
    })
    ;

}

export default Config;
