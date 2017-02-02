import _ from 'underscore';

export default class Controller {
  constructor($scope, $validation, $uibModalInstance, toastr, info) {
    'ngInject';

    this._scope = $scope;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this.info = info;

    this.autoCompleteOptions = {
      minimumChars: 1,
      data: function (term) {
        term = term.toUpperCase();
        var match = _.filter(info.agencyList, function (value) {
            return value.name.startsWith(term);
        });
        return _.pluck(match, 'name');
      }
    }

  }

  

  cancel() {
    this._modalInstance.close();
  }

  submit(form) {
    //验证表单
    this._validationProvider.validate(form).success(() => {
      this.saveFunc();
    });
  }

  saveFunc() {
    
  }
}
