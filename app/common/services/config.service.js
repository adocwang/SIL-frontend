export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._api = ApiMap.config;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  get(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.get, {params: params}).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  set(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.set, data).then(this._httpHelper.verify, this._httpHelper.error);
  }

  getSpecial(key, params) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.getSpecial.replace(/\{key\}/, key), {params: params}).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  setSpecial(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.setSpecial, data).then(this._httpHelper.verify, this._httpHelper.error);
  }

}