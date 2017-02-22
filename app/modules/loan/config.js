function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('loan', {
        url: '/loan',
        template : '<ui-view></ui-view>',
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
        sidebarMeta: {
          order: 10
        }
    })
    .state('loan.list', {
        url: '/list',
        template: '<loan-list></loan-list>',
        title: '贷款企业列表',
        sidebarMeta: {
          order: 20
        }
    })
    .state('loan.decision', {
        url: '/decision?id',
        template: '<loan-decision></loan-decision>',
        title: '贷款辅助决策信息修正'
    })
    ;

}

export default Config;
