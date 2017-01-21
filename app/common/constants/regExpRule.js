export const expression = {
  required: function (value) {
      return !!value;
  },
  requiredIfNeed: function(value, scope, element, attrs, param){
      var obj = scope.$parent;
      var expression = param.split('|');
      // var arr = expression[0].split('.');
      var bool, determination;

      if(expression.length != 3 || !expression[0] || !/^(\s+)?[!=><]+(\s+)?$/.test(expression[1])) {
          return true;
      }

      //简化实现
      determination = new Function('return this && this.'+expression[0]).call(obj);

      bool = new Function('return '+ determination + expression[1] + expression[2])();

      if(bool){
          return !!value;
      } else {
          return true;
      }
  },
  notNull: function( value ){
      if( value || value === 0 ){
          return true;
      }
      return false;
  },
  notBlank: function(val) {
      if(val === '') return false;
      else return true;
  },
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  number: function(val) {
      if(val === '' || /\s/g.test(val)) return true;
      return /^\d+$/.test(val);
  },
  // 手机
  mobile: function(val) {
      // 需要以这种方法写, 不然当它为空值时也会进行验证
      return val ? /^(13|14|15|17|18)\d{9}$/i.test(val) : true;
  },
  // 座机 (999)99999999 或 999-99999999 或 99999999999
  tel: /^((\(\d{2,3}\))|(\d{3}\-)|(\d{3}))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i,
  telOrMobile: function (value) { // 相同支持手机和座机
      return expression.mobile(value) || expression.tel.test(value);
  },
  noSpace: function(value, scope, element) {
      // angular-validation对文本夫域传来的值作了trim截取, 所以无法直接获知值的首尾是包含空格
      return !/\w*\s+\w*/g.test(element.val());
  },
  float: /^[-+]?[0-9]*\.?[0-9]+$/,
  minlength: function (value, scope, element, attrs, param) {
      return value.length >= param;
  },
  maxlength: function (value, scope, element, attrs, param) {
      return value.length <= param;
  },
  min: function(value, scope, element, attrs, param){
      return parseFloat(value) >= parseFloat(param);
  },
  minNotEqual: function(value, scope, element, attrs, param){
      return parseFloat(value) > parseFloat(param);
  },
  max: function(value, scope, element, attrs, param){
      return parseFloat(value) <= parseFloat(param);
  },
  range: function(value, scope, element, attrs, param){
      // 此处有坑，在判断并列条件的时候，会出现误判，故都转成数字在对比
      var arr = param.split('|');
      value = parseFloat(value);
      return value >= parseFloat(arr[0]) && value <= parseFloat(arr[1]);
  },
  cert: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
  displayCode: function (value) {
      if (value == "") {
          return true;
      }
      return !!(value.length == 4)
  },
  identity: function (str) {

    if(!str) {
      return true;
    }

      str = $.trim(str).toString();

      var transformatIdFrom15To18 = function(idCardNo) {
          var v = new Array(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7);
          var vs = "10X98765432";
          if (idCardNo == null || idCardNo.length != 15) {
              return "";
          }
          // 将15位的号码转换位17位
          var cardID17 = idCardNo.substring(0, 6) + "19" + idCardNo.substring(6);
          var N = 0;
          var R = -1;
          var T = '0';// 储存最后一个数字
          var j = 0;
          var cardID18 = "";
          // 计数出第18位数字
          for (var i = 16; i >= 0; i--) {
              N += parseInt(cardID17.substring(i, i + 1)) * v[j];
              j++;
          }
          R = N % 11;
          T = vs.charAt(R);
          cardID18 = cardID17 + T;
          return cardID18;
      };

      if( str.length == 15 ){
          str = transformatIdFrom15To18( str );
      }

      var iSum = 0,
          sId = str,
          aCity = {
              11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
              21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
              33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
              41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
              46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
              54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
              65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
          };
      if (!/^\d{17}(\d|x)$/i.test(sId)) {
          return false;
      }
      sId = sId.replace(/x$/i, "a");
      //非法地区
      if (aCity[parseInt(sId.substr(0, 2), 10)] == null) {
          return false;
      }
      var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2)),
          d = new Date(sBirthday.replace(/-/g, "/"));
      //非法生日
      if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
          return false;
      }
      for (var i = 17; i >= 0; i--) {
          iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
      }
      if (iSum % 11 != 1) {
          return false;
      }
      return true;
  },
  relation: function (value) {
      return !!( (value == 0) || (value == 1) || (value == 2) || (value == 3) )
  },
  account: /^[a-z|A-z|0-9|_]+$/,
  chinese: /^[\u4E00-\u9FA5]+$/,
  nonUnicode: function(value) {
      return !/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(value);
  },
  digitalLetter: function(val) {
      if(val === '') return true;
      return /^[A-Za-z0-9]+$/.test(val);
  },
  decimalLimit: function(value, scope, element, attrs, param) {
      var reg = eval('/^\\d+(\\.\\d{1,'+ param +'})?$/');
      return reg.test(value);
  },
  accountPwd: /^\S{6,20}$/,
  discount: function(val) {
    if(val == 10){
      return true;
    }
    return /^\d(\.\d)?$/.test(val);
  }
};

export const defaultMsg = {
  required: {
      error: '该项为必填项!',
      success: ' '
  },
  requiredIfNeed: {
      error: '该项为必填项!',
      success: ' '
  },
  notNull: {
      error: '该项为必填项!',
      success: ' '
  },
  url: {
      error: 'url格式不正确！',
      success: ' '
  },
  email: {
      error: 'email格式不正确！',
      success: ' '
  },
  number: {
      error: '数字格式不正确！',
      success: ' '
  },
  float: {
      error: '小数格式不正确！',
      success: ' '
  },
  minlength: {
      error: '内容长度不够！',
      success: ' '
  },
  maxlength: {
      error: '内容长度过长！',
      success: ' '
  },
  min: {
      error: '您的输入值小了',
      success: ' '
  },
  minNotEqual: {
      error: '您的输入值小了',
      success: ' '
  },
  max: {
      error: '您的输入值大了！',
      success: ' '
  },
  range: {
      error: '输入范围有误！',
      success: ' '
  },
  cert: {
      error: '身份证格式不对！',
      success: ' '
  },
  displayCode: {
      error: '手环编码为四位',
      success: ' '
  },
  identity: {
      error: '身份证格式不对！',
      success: ' '
  },
  relation: {
      error: '请选择亲属关系',
      success: ' '
  },
  mobile: {
      error: '手机格式不正确',
      success: ' '
  },
  telOrMobile: {
      error: '手机或座机号码不正确',
      success: ' '
  },
  noSpace: {
      error: '不能填写空白字符',
      success: ' '
  },
  account: {
      error: '格式只能输入字母数字下划线',
      success: ' '
  },
  chinese: {
      error: '请输入中文',
      success: ' '
  },
  nonUnicode: {
      error: '不能包含中文字符',
      success: ' '
  },
  digitalLetter: {
      error: '只能是数字或字母',
      success: ' '
  },
  notBlank: {
      error: '该项为必填项',
      success: ' '
  },
  decimalLimit: {
      error: '小数位数过长！',
      success: ' '
  },
  accountPwd: {
      error: '密码为6-20位字符',
      success: ''
  },
  discount: {
    error: '小数格式不正确!'
  }
};
