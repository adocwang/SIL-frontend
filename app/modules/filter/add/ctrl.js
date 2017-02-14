class Controller {

  constructor($scope, $state, $stateParams, $validation, toastr, ProcessService, checkStateService) {
    'ngInject';

    this._scope = $scope;

    this._state = $state;
    this._toastr = toastr;
    this._stateParams = $stateParams;

    this._validation =  $validation;

    this._checkStateService = checkStateService;

    this._service = ProcessService;

    this.id = this._stateParams.id || null;

    this.info = null;
    this.inputInfo = {
      content: '',
      title: ''
    };

    this._init();
  }

  _init() {
    let destroyWatchText = this._scope.$watch('vm.inputInfo.content', () => {
      if(this.inputInfo.content) {
        // console.log(marked(this.inputInfo.content));
        this.html = marked(this.inputInfo.content);
      } else {
        this.html = '';
      }
    });
    /*
    * $scope销毁的时候,结束监听
    */
    this._scope.$on('$destroy', destroyWatchText);

    this._checkStateService.formStateChange(this._scope, 'vm.Form');

    this._get();
  }

  _get() {

    if(this.id) {
      this._service.tipsGet(this.id).then(data => {
        this.info = data;

        this.inputInfo = {...data};

        this.defaultContent = data.content;
      }).catch(data => {
        this.id = null;
      });
    }
  }

  _read() {
    this._service.set({
      id: this.id,
      state: 1
    }).then(data => {

    });
  }

	delete(form) {
    form.$pristine = true;
		this._service.tipsSet({
      id: this.id,
      state: 3
    }).then(data => {
      this._toastr.success('删除成功!');
      this._state.go('process.tips');
    });
	}

  submit(form) {
    //验证表单
    this._validation.validate(form).success(() => {
      this.saveFunc(form);
    });
  }

  saveFunc(form) {
    const data = this.inputInfo;
    if(this.id) {
      this._service.tipsSet(data).then(data => {
        form.$pristine = true;
        this._toastr.success('保存成功');
        this._state.go('process.tips');
      });
    } else {
      this._service.tipsAdd(data).then(data => {
        form.$pristine = true;
        this._toastr.success('添加成功');
        this._state.go('process.tips');
      });
    }
  }
}

export default Controller;