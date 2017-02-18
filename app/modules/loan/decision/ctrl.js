

class Controller {

  constructor($injector, $state, $location, $validation, $stateParams, toastr, $uibModal, LoanService) {
    'ngInject';

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._validationProvider = $validation;
    this.id = this._stateParams.id;

    this._toastr = toastr;

    this._service = LoanService;

    this.filters = {};
    this.loanList = [];

    this._init();

    this.typeList = {
      'integer': '数值',
      'string': '文本'
    };


  }

  _init() {
    var data = {
      id: 1
    }
    this._getTemplate(data);
  }

  reCount() {
    var data = {
      id: 1,
      data: angular.toJson(this.loanList)
    };
    this._getTemplate(data,'重新计算成功');
  }

  getTotal() {
    var total = 0;
    this.loanList.forEach(function(loan){
      total += parseInt(loan.point);
    });
    return total;
  }

  _getTemplate(data, msg='') {
    this._service.get(data).then(data => {
      if(data && !jQuery.isEmptyObject(data)) {
        this.loanList = data;
        if (msg.length > 0) {
          this._toastr.success(msg);
        }
      } else {
        this.initCollectInfo();
      }
    });
  }

  submit(form) {
    //验证表单
    this._validationProvider.validate(form).success(() => {
      this.saveFunc();
    });

  }

  saveFunc() {
    var data = {
      id: 1,
      data: angular.toJson(this.loanList)
    };
    this._service.get(data).then(data => {
      if(data && !jQuery.isEmptyObject(data)) {
        this.loanList = data;
        this._toastr.success('保存成功');
      } else {
        this.initCollectInfo();
      }
    });
  }

}

export default Controller;
