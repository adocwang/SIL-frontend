export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._apiMap = ApiMap;

    this._api = ApiMap.enterprise;

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

  getBankList(params) {
    this._httpHelper.blockUI.start();
    return this._http.get(this._apiMap.bank.get, {params: params})
      .then(this._httpHelper.verify, this._httpHelper.error);
  }
  
  getUserList(data) {
    this._httpHelper.blockUI.start();
    return this._http.post(this._apiMap.person.list, data)
      .then(this._httpHelper.verify, this._httpHelper.error);
  }


}