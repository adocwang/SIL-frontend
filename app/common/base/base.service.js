export default class BaseService {

  constructor($http, httpHelper, toastr) {
    'ngInject';
    this.$http = $http;
    this.httpHelper = httpHelper;
    this.toastr = toastr;

    this.urlPrefix = {
      // old
      //old: '/api/old/',

      // old group
      //group: '/api/group/'
    };

  }

  _init() {

    this.baseInfo = window.pageConf.adminData;

  }

  fetch(type, method, params = {}) {

    return this._RESTfulFactory('get', type, method, params);

  }

  fetchList(type, params) {

    return this.fetch(type, 'list', params);

  }

  edit(type, id, params = {}) {

    return this._RESTfulFactory('put', type, id, params);

  }

  add(type, method, params = {}) {

    return this._RESTfulFactory('post', type, method, params);

  }

  delete(type, method, params = {}) {

    return this._RESTfulFactory('delete', type, method, params);

  }

  // Deprecated
  getDetail(type, data) {

    this.httpHelper.blockUI.start();

    //this.fetch(type, 'list', params);

    console.log(type)
    let url = this.urlPrefix[type] + 'id';
    return this.$http.get(url).then(this.httpHelper.verify, this.httpHelper.error);

  }

  /**
   * RESTful http request factory function
   */
  _RESTfulFactory(verb, type, method, params) {

    this.httpHelper.blockUI.start();

    let paramsName = ['post', 'put'].indexOf(verb) > -1 ? 'data' : 'params';

    return this.$http[verb](this._getUrl(type, method), {
      [paramsName]: params
    }).then(this.httpHelper.verify, this.httpHelper.error);

  }

  // TODO
  // fetchSearchList() {
  //   return $http.get('/api/old/searchOld', {params: data || {}}).then(httpHelper.verify,  httpHelper.error);
  // }

  _getUrl(type, method) {

    return this.urlPrefix[type] ? `${this.urlPrefix[type]}/${method}` : `/api/${type}/${method}`;

  }

  notify(message, type = 'success') {

    return () => { this.toastr[type](message); }

  }

}
