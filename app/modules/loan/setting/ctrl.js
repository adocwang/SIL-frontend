

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

    this.addCondition();
  }

  addCondition() {
    let loanObj = {
      title: '',
      point: '0',
      condition_list: []
    }
    this.loanList.push(loanObj);
    this.addProject(loanObj);
  }

  addProject(loanObj) {
    let projectObj = {
      title: '',
      option_type: 'integer',
      options: []
    };
    //this.loanList.push(projectObj);
    loanObj.condition_list.push(projectObj);
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
    var that = this;
    var stop = false;
    this._validationProvider.validate(form).success(() => {
      //不能超过100分数
      var point = 0;
      this.loanList.forEach(function(loan){
        var loanPoint = 0;
        loan.condition_list.forEach(function(condition){
            var maxPoint = 0
            condition.options.forEach(function(option){
              if (option.point > maxPoint) {
                maxPoint = parseInt(option.point);
              }
            })
            loanPoint += parseInt(maxPoint);
        });
        if (loanPoint > parseInt(loan.point)) {
          that._toastr.error(loan.title+'分类的总分超过预定分类总分');
          stop = true;
          return false;
        }
        point += parseInt(loan.point);
      });
      if (stop) {
        return;
      }
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
