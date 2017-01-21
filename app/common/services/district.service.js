/**
 * 腾讯行政区划API
 * http://lbs.qq.com/webservice_v1/guide-region.html
 */
export default class DistrictService {
  constructor($http, $q){
    'ngInject';
    this._q = $q;
    this._http = $http;
    this.url = '//apis.map.qq.com/ws/district/v1/'
    this.opts = {
      key: 'ZAUBZ-4OG3J-ZVTFF-F7NED-PHMJT-DZBYG',
      output: 'jsonp',
      callback: 'district_cb'
    }
  }

  _prev() {
    let deferred = this._q.defer();
    window.district_cb = function(res) {
      // TODO 加loading, 避免地址没加载完
      // httpHelper.blockUI.stop();
      deferred.resolve( res.result[0] );
    }

    return deferred;
  }

  // --------- method --------------
  list() {

    let deferred = this._prev();

    this._http.jsonp(this.url + 'list', {params: this.opts});

    return deferred.promise;
  }

  getchildren(id) {

    let deferred = this._prev();
    let params = {...this.opts, id};

    this._http.jsonp(this.url + 'getchildren', {params: params});

    return deferred.promise;
  }

  format(data, level = 3) {
    if(data === void(0)){
      return void(0);
    } else if(typeof data == 'string'){
      let regx, match, result;

      const reg = /^(.*)\-(\d*)$/

      const addressArray = data.split(';');
      const length = addressArray.length;

      if(length > 0) {
        result = {
          address: addressArray[length-1]
        };
      }

      if(length > 1 && (match = addressArray[0].match(reg))){
        result.province = {
          fullname: match[1],
          id: match[2]
        }
      }

      if(length > 2 && (match = addressArray[1].match(reg))){
        result.city = {
          fullname: match[1],
          id: match[2]
        }
      }

      if(length > 3 && (match = addressArray[2].match(reg))){
        result.district = {
          fullname: match[1],
          id: match[2]
        }
      }

      // if(level == 2) {
      //   regx = /^(.*)\-(\d*)\;(.*)\-(\d*)\;(.*)$/;
      // } else {
      //   regx = /^(.*)\-(\d*)\;(.*)\-(\d*)\;(.*)\-(\d*)\;(.*)$/;
      // }

      // match = data.match(regx);

      // if(match) {

      //   result = {
      //     province: {
      //       fullname: match[1],
      //       id: match[2]
      //     },
      //     city: {
      //       fullname: match[3],
      //       id: match[4]
      //     }
      //   }

      //   if(level == 2) {
      //     result.address = match[5];
      //   } else {
      //     result.district = {
      //       fullname: match[5],
      //       id: match[6]
      //     };

      //     result.address = match[7];
      //   }
      // }

      return result;
    } else if(data.address ) {
      let string = '';

      if(data.province){
        string = `${string}${data.province.fullname}-${data.province.id};`

        if(data.city){
          string = `${string}${data.city.fullname}-${data.city.id};`

          if(data.district){
            string = `${string}${data.district.fullname}-${data.district.id};`;
          }
        }
      }

      return `${string}${data.address}`;
    }
  }
}
