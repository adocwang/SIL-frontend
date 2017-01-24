function Config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('message', {
        url: '/message',
        abstract: true,
        template : '<ui-view></ui-view>',
        title: '提示消息'
    })
    .state('message.list', {
        url: '',
        template: '<message-list></message-list>',
        title: '消息列表'
    })
    .state('message.detail', {
      url: '/detail?id',
      template: '<message-detail></message-detail>',
      title: '消息详情'
    })
    ;

}

export default Config;
