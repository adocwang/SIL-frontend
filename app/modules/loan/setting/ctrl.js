

class Controller {

  constructor($injector, $state, $location, $validation, $stateParams, toastr, $uibModal, ConfigService) {
    'ngInject';

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._validationProvider = $validation;

    this._toastr = toastr;

    this._service = ConfigService;

    this.filters = {};


    this.conditionList = {
      'string': {
        '=': '完全匹配',
        'like': '包含',
        'not_like': '不包含'
      },
      'integer': {
        '<': '<',
        '<=': '<=',
        '>': '>',
        '>=': '>=',
        '=': '='
      }
    };

    this.typeList = {
      'integer': '数值',
      'string': '文本'
    };

    this._init();

  }

  _init() {
    this._getTemplate();

  }

  _getTemplate() {
    this._service.get('loan.decision_condition').then(data => {
      if(data && !jQuery.isEmptyObject(data)) {
        this.loanList = JSON.parse(data);
      } else {
        this.initCollectInfo();
      }
    });
  }

  initCollectInfo() {
    this.loanList = [];

    this.addProject();
  }

  addProject() {
    let projectObj = {
      title: '',
      option_type: 'integer',
      options: []
    };
    this.loanList.push(projectObj);
    this.addItem(projectObj);
  }

  deleteProject(index) {
    this.loanList.splice(index, 1);
  }

  addItem(project) {
    let contentObj = {
      condition: (project.option_type == 'string')? '=' : '<',
      value: '',
      point: ''
    };

    project.options.push(contentObj);
  }

  deleteItem(proj, index) {
    proj.options.splice(index, 1);
  }

  deleteData(item, index) {
    item.dataSource.splice(index, 1);
  }

  typeChange(project) {
    project.options.forEach(function(option){
      if (project.option_type == 'integer') {
        option.condition = '<';
      } else {
        option.condition = '=';
      }
    });
  }

  submit(form) {
    //验证表单
    this._validationProvider.validate(form).success(() => {
      //不能超过100分数
      var point = 0;
      this.loanList.forEach(function(loan){
        var loanPoint = parseInt(loan.default_point);
        loan.options.forEach(function(option){
          if (parseInt(option.point) > parseInt(loanPoint)) {
            loanPoint = parseInt(option.point);
          }
        });
        point += loanPoint;
      });
      if (point > 100) {
        this._toastr.error('分数不能超过100');
        return;
      }
      this.saveFunc();
    });

  }

  saveFunc() {
    //console.log('submit')

    //console.log(this.loanList, JSON.stringify(this.loanList));

    this._service.set({
      key: 'loan.decision_condition',
      value: angular.toJson(this.loanList)
    }).then(data => {
      this._toastr.success('保存成功');
    });
  }

}

export default Controller;
