function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('loan', {
        url: '/loan',
        template : '<ui-view><loan-setting></loan-setting></ui-view>',
        title: '贷款决策',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 450,
        }
    })
    .state('loan.setting', {
        url: '/setting',
        template: '<loan-setting></loan-setting>',
        title: '贷款决策条件设置',
    })
    ;

}

export default Config;
