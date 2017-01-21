/**
 * 编辑页面基类控制器
 * 1.实例属性：
 *  id: 编辑项的id (需设定stateParams的id的key也为id)
 * 2. 需调用_init()函数，若需要扩展它，需在子类中的_init()中调用super._init()
 * 3. 需在子类中声明getDetailFunc()函数，用于请求数据并处理，此函数会自动在此超类中被调用
 */
export default class BaseEditCtrl {

  constructor($injector) {

    this.checkStateService = $injector.get('checkStateService');
    this.$stateParams      = $injector.get('$stateParams');
    this.$validation       = $injector.get('$validation');
    this.httpHelper        = $injector.get('httpHelper');
    this.AreaService       = $injector.get('AreaService');
    this.AppSettings       = $injector.get('AppSettings');
    this.$timeout          = $injector.get('$timeout');

    this.areaList = this.AreaService.getList();

    this.id = '';
    this.formData = {};

  }

  _init() {

    this.id = this.$stateParams.id || '';
    if(this.id) {
      //this.httpHelper.blockUI.start();

      if(!this.getDetailFunc) {
        console.warn('Need define getDetailFunc() method in sub controller!');
        return;
      }

      this.getDetailFunc(this.id);
    }

  }

  listen(scope, ctrl) {

    this.checkStateService.addCheck(scope, ctrl.formListen);

  }

  validation(form, contextCtrl) {

    //this.formValidation.submit(form, contextCtrl);
    this.$validation.validate(form)
        .success(function(){
          if(!contextCtrl.saveFunc) {
            console.warn('Need define saveFunc() method in sub controller!');
            return;
          }

          contextCtrl.saveFunc();
        });

  }

  formValidation() {

    return {
      submit: (form, contextCtrl) => {
        this.$validation.validate(form)
        .success(function(){
          if(!contextCtrl.saveFunc) {
            console.warn('Need define saveFunc() method in sub controller!');
            return;
          }

          contextCtrl.saveFunc();
        });
      }
    }

  }

  // 构建循环的Form表单实例，以便通过$index访问指定表单实例
  buildForm(formList, formData) {

    Object.keys(formList).forEach((type) => {
      formData[type].forEach((item, index) => {
        formList[type][index] = type + index;
      });
    });

  }

  initAvatar() {

    this.avatarInfo = {
      editing: false,
      loadUploadScope: scope => { this._uploadScope = scope; this.avatarInfo.editing = true; },
      saveAvatar: () => { this._uploadScope && this._uploadScope.savedAvatar();}
    }

  }

  // 头像上传成功回调
  avatarUploadSucess(file, data, scope) {
    //console.log(data);

    this.$timeout(() => {
      let {avatar_id, avatar_url, avatar} = data.data;

      Object.assign(this.avatarInfo, {
        // 兼容
        avatar: avatar_url || avatar,
        avatar_id: avatar_id,
        editing: false
      });
    });

  }

  // date: string to moment
  _toMoment(data, fields) {
    for(let key in data) {
      if(fields.includes(key)) {
        data[key] = new moment(data[key]);
      }
    }
    return data;
  }

  // date: moment to string
  _momentFormat(data) {
    for(let key in data) {
      if(data[key] instanceof moment) {
        data[key] = data[key].format('YYYY-MM-DD');
      }
    }
    return data;
  }

}
