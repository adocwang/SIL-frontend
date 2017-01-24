import httpInterceptor       from './services/http.interceptor';

// import {AlarmListController, AlarmDeviceController} from './../modules/alarm/index';

function coreConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('dashboard', {
        url: '/',
        template: '<dashboard></dashboard>',
        title: '社区主页',
        sidebarMeta: {
          icon: 'icon-sidebar_home_ic',
          order: 1
        }
    });

  $urlRouterProvider.otherwise('/');


  // http interceptor
  //
  // For purposes of global error handling, authentication,
  // or any kind of synchronous or asynchronous pre-processing of request or postprocessing of responses
  $httpProvider.interceptors.push(httpInterceptor);

}

export default coreConfig;
