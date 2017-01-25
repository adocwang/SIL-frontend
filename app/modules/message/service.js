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

  getList(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.getList, {params: params}).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  read(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.read, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  delete(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.delete, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }
}