class Controller {

  constructor($scope, $state, $stateParams, $validation, toastr, ConfigService, checkStateService) {
    'ngInject';

    this._scope = $scope;

    this._state = $state;
    this._toastr = toastr;
    this._stateParams = $stateParams;

    this._validation =  $validation;

    this._checkStateService = checkStateService;

    this._service = ConfigService;

    // this.id = this._stateParams.id || null;

    this.info = null;

    this.key = 'enterprise.enter_condition';

    this.sortableConf = {
      name: 'todo',
      animation: 150
    };
    this.inputInfo = {
      content: '',
      title: ''
    };

    this.typeList = [
      {
        value: 'integer',
        name: '数字'
      },
      {
        value: 'string',
        name: '文本'
      }
    ];

    this.groupCondition = [
      {
        value: 'all',
        name: '必须全部满足'
      },
      {
        value: 'one',
        name: '满足一个即可'
      },
      {
        value: 'oneNot',
        name: '不同时满足'
      },
      {
        value: 'allNot',
        name: '不能满足任何一个'
      },
    ];

    this.conditionList = {
      string: [
        {
          value: '=',
          name: '等于'
        },
        {
          value: '%=',
          name: '包含'
        },
        {
          value: '!=',
          name: '不包含'
        },
      ],
      integer:[
        {
          value: '=',
          name: '等于'
        },
        {
          value: '>',
          name: '大于'
        },
        {
          value: '>=',
          name: '大于等于'
        },
        {
          value: '<',
          name: '大于'
        },
        {
          value: '<=',
          name: '大于'
        },
      ]
    };

    this._init();
  }

  _init() {

    // this.list = [{
    //   condition: 'all',
    //   list: [
    //     {
    //       title: '',
    //       type: 'integer',
    //       condition: '=',
    //       value: 1
    //     },

    //     {
    //       title: '',
    //       type: 'integer',
    //       condition: '=',
    //       value: 1
    //     }
    //   ]
    // },
    // {
    //   condition: 'all',
    //   list: [
    //     {
    //       title: '',
    //       type: 'integer',
    //       condition: '=',
    //       value: 1
    //     },
        
    //     {
    //       title: '',
    //       type: 'integer',
    //       condition: '=',
    //       value: 1
    //     }
    //   ]
    // }
    // ]
    this._get();
  }

  _get() {

    this._service.get(this.key).then(data => {
      if(data) {
        this.list = angular.fromJson(data);
      } else {
        this.initCollect();
      }
    }).catch(data => {
      this.initCollect();
    });
  }

  initCollect() {
    this.list = [];
    this.addGroup();
  }

  addGroup() {
    let group = {
      condition: 'all',
      list: []
    };
    this.addItem(group);
    this.list.push(group);
  }

  addItem(group) {
    let item = {
      title: '',
      type: 'integer',
      condition: '=',
      value: ''
    };
    group.list.push(item);
  }

  delGroup(index) {
    this.list.splice(index, 1);
  }

  delItem(group, index) {
    group.list.splice(index, 1);
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
    this._service.set({
      key: this.key,
      value: angular.toJson(this.list)
    }).then(data => {
      form.$pristine = true;
      this._toastr.success('添加成功');
    });
  }
}

export default Controller;