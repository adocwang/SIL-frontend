function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('person', {
        url: '/person',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '个人中心'
    })
    .state('person.detail', {
        url: '',
        template: '<person-view></person-view>',
        title: '资料详情'
    })
    ;

}

export default Config;
