export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._api = ApiMap.bank;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  list(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.get, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  add(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.add, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }


  set(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.set, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }
}