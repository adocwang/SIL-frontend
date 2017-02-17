function coreRun($rootScope, AppSettings, $log, $state, $stateParams, $location, $window, $timeout, toastr, ProfileService) {
  'ngInject';

  // 把常用的工具挂载到$rootScope上, 在所有scope上直接可用
  $rootScope.$log = $log;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$location = $location;

  const access = ProfileService.access;

  // 所有人都能访问的白名单列表
  const whiteList = [
    'dashboard'
  ];

  const token = localStorage.getItem('SIL_TOKEN');
  const uid = localStorage.getItem('SIL_UID');

  if(!token || !uid) {
    $window.location.href = '/login.html';
  }

  $rootScope.$on('$stateChangeStart',
    (event, toState, toParams, fromState, fromParams) => {
    // if (access[toState.name] || whiteList.indexOf(toState.name) >= 0 ) {
    //   return;
    // }

    // toastr.error('页面不存在或没有权限', 'Forbidden');

    // event.preventDefault();
  });


  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;

    // hack: 进入页面时，body上会被添加modal-open, 导致页面无法滚动（偶发）
    $timeout(() => {
      angular.element('body').hasClass('modal-open') && console.warn('modal-open class on body!');
      angular.element('body').removeClass('modal-open');
    }, 300);

  });

  // 回退历史
  $rootScope.back = () => {
    $window.history.go(-1);
  }

  // 客户套餐
  // $rootScope.accessControl = AccessControlService.getCond();

}

export default coreRun;
