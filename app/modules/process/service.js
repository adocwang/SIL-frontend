export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._api = ApiMap.process;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  get(id) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.get.replace(/\{id\}/, id)).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  getList(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.getList, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  set(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.set, data).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  tipsGet(id) {
    
    this._httpHelper.blockUI.start();

    return this._http.get(this._api.tipsGet.replace(/\{id\}/, id)).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  tipsList(params) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.tipsList, params).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  tipsSet(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.tipsSet, data).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  tipsAdd(data) {
    
    this._httpHelper.blockUI.start();

    return this._http.post(this._api.tipsAdd, data).then(this._httpHelper.verify,  this._httpHelper.error);
  }


}