export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._api = ApiMap.message;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  get(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.get, {params: params}).then(this._httpHelper.verify,  this._httpHelper.error);
  }
}