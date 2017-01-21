export default class util {

  constructor($window, $http,toastr, sweet, mcRegExp) {
    'ngInject';

    this._window = $window;
    this._http = $http;

    this.toastr = toastr;
    this.sweet = sweet;
    this.mcRegExp = mcRegExp;

  }
  // 退出操作
  logout() {
    return this._http.get('/user/logout').then(data => {
      if (data.data.status === 0) {
          this._window.location.href = '/';
      }
    });
  }

  /**
   * 用underscore从一个对象数组中删除指定的对象
   * @param arr 该数组
   * @param whereObj 查询要删除的对象
   */
  removeItemFromArray(arr, whereObj) {
      return _.without(arr, _.findWhere(arr, whereObj));
  }

  /**
   * 获取指定月的总天数
   * @param date | string 日期对象或日期字符串
   * @returns {number}
   */
  getDaysLenInMonth(date) {
      if(angular.isString(date)){
          date = new Date(date);
      }
      var month = parseInt(date.getMonth() + 1, 10);
      return new Date(date.getFullYear(), month, 0).getDate();
  }

  /**
   * 针对非表单字段做数据验证
   * @param  {[type]} type  [description]
   * @return {[type]}       [description]
   */
  validate(type) {
      var types = type.split(','),
          result = true,
          expr,
          args = Array.prototype.slice.call(arguments, 1);

      // 把第二个参数param归位到最后一个参数（把param放到第二个参数是因为使用方便）
      args.splice(1, 0, null, null, null);

      function applyExpr(type) {
          expr = this.mcRegExp.expression[type];
          if(expr instanceof RegExp) {
              result = expr.test(args[0]);
          }else {
              result = expr.apply(null, args);
          }
      }

      if(types.length > 1) {
          // http://stackoverflow.com/questions/13843972/angular-js-break-foreach
          angular.forEach(types, function(type){
              type && type.trim();
              if(result) {
                  applyExpr(type);

                  if(!result) {
                      this.toastr.warning(this.mcRegExp.defaultMsg[type].error);
                      return false;
                  }
              }
          });
      }else {
          applyExpr(type);

          if(!result) {
              this.toastr.warning(this.mcRegExp.defaultMsg[type].error);
          }
      }

      return result;
  }

  /**
   * 允许访问以点连接的属性表达式字符串访问子属性
   * @param  {[type]} obj  targe
   * @param  {[type]} desc visit prop string
   * @return {[type]}      value
   * @example
   *   getDescendantProp({a: 1, b: {c: 2}}, 'b.c')  // 2
   */
  getDescendantProp(obj, desc) {
      var arr = desc.split(".");
      while(arr.length && (obj = obj[arr.shift()]));
      return obj;
  }

  /**
   * 询问窗口
   * @param  {[type]}   opts toastr参数
   * @param  {Function} cb   确认回调
   */
  confirm(opts, cb) {
      var options = angular.extend({
          title: '提示',
          text: '',
          //type: 'warning',
          imageUrl: '/dist/images/common/warning.png',
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
      }, opts);

      this.sweet.show(options, function (isConfirm) {
          cb(isConfirm);
      });
  }

  /**
   * 替换underscore的pick()
   * http://stackoverflow.com/a/25835337/4723163
   *
   * example:
   *   let data = {foo: 'test', abc: 1, zyx: 222}
   *   pick(data, 'foo', 'zyx') // => {foo: 'test', zyx: 222}
   */
  pick(o, ...fields) {
    if(!o) return {};

    return fields.reduce((a, x) => {
      if(x.includes('.')) {
        // TODO: 判断hasOwnProperty
        a[x.split('.').pop()] = this.getDescendantProp(o, x);
      }else {
        if(o.hasOwnProperty(x)) a[x] = o[x];
      }

      return a;
    }, {});
  }

  /**
   * 在一个Object列表中，通过id/value获取其对应的text/name
   * list: Object数组
   * id: 查找的id
   * idKey: id的属性名(默认为value)
   * textKey: text的属性名(默认为name)
   * 如果不存在对应text则返回""
   */
  getTextById(list, id, idKey = 'value', textKey = 'name') {
    if(!list || !angular.isArray(list)) return;
    let filtered = list.filter(item => id === item[idKey]);
    return filtered.length ? filtered[0][textKey] : '';
  }

}
