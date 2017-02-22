export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._api = ApiMap.loan;
    this._eapi  = ApiMap.enterprise;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  get(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.get, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  set(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.set, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  getList(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._eapi.getList, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }
}