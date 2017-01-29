function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('investment', {
        url: '/investment',
        // abstract: true,
        template : '<ui-view><investment-list></investment-list></ui-view>',
        title: '投资机构',
        sidebarMeta: {
          icon: 'icon-sidebar_members_ic',
          order: 300,
        }
    })
    // .state('investment.list', {
    //     url: '',
    //     template: '<investment-list></investment-list>',
    //     title: '机构列表'
    // })
    ;

}

export default Config;
