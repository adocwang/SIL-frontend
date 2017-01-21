import angular from 'angular';


function toastrConfig(toastrConfig) {
  'ngInject';

  angular.extend(toastrConfig, {
    allowHtml: false,
    autoDismiss: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    maxOpened: 0,
    messageClass: 'toast-message',
    newestOnTop: true,
    onHidden: null,
    onShown: null,
    onTap: null,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: true,
    progressBar: true,
    tapToDismiss: true,
    target: 'body',
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 2000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
}

export default toastrConfig;
