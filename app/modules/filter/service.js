export default class Service {
  constructor($http, httpHelper, $rootScope, $state, ApiMap) {
    'ngInject';

    this._http = $http;
    // this.$q = $q;
    this._httpHelper = httpHelper;

    this._apiMap = ApiMap;

    this._api = ApiMap.filter;

    this._rootScope = $rootScope;
    this._state = $state;
  }

  getBlackList(params) {
    this._httpHelper.blockUI.start();
    return this._http.post(this._api.blacklist.list, params)
      .then(this._httpHelper.verify, this._httpHelper.error);
  }
  addBlackList(params) {
    this._httpHelper.blockUI.start();
    return this._http.post(this._api.blacklist.add, params)
      .then(this._httpHelper.verify, this._httpHelper.error);
  }
  delBlackList(params) {
    this._httpHelper.blockUI.start();
    return this._http.post(this._api.blacklist.del, params)
      .then(this._httpHelper.verify, this._httpHelper.error);
  }
  


}