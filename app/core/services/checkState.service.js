export default class checkStateService {

  constructor($rootScope, $state, sweet, utilService) {
    'ngInject';

    this._rootScope = $rootScope;
    this._state = $state;
    this._sweet = sweet;
    this._utilService = utilService;

  }

  formStateChange(scope, formName) {

    var removeListener = this._rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {

      var form = formName.split('.').length > 1 ? this._utilService.getDescendantProp(scope, formName): scope[formName];
      // 没有修改过
      if(!form || (form && form.$pristine)) { return; }

      this.leaveConfirm( isConfirm => {
        if (!isConfirm) {
          // https://github.com/angular-ui/ui-router/issues/1158
          this._state.go(toState.name, toParams, {notify: false}).then(() => {
            this._rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
          });
        }
      });

      event.preventDefault();
    });

    scope.$on('$destroy', removeListener);

  }

  leaveConfirm(cb) {

    this._sweet.show({
      title: '提示',
      text: '当前信息尚未保存，是否离开此页面？',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '留下',
      cancelButtonText: '离开'
    }, sure => cb(sure));

  }

}
