export default class Controller {
  constructor($scope, $validation, $uibModalInstance, toastr, info) {
    'ngInject';

    this._scope = $scope;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this.info = info;

    this.inputInfo = {
      main: info.manage_a && info.manage_a.userid,
      vice: info.manage_b && info.manage_b.userid
    };

    this.list = [
        {
          id: 12,
          name: '王乐乐',
          avatar: '/images/common/man.png'
        },
        {
          id: 23,
          name: '刘立军',
          avatar: '/images/common/man.png'
        },
        {
          id: 24,
          name: '王明涵',
          avatar: '/images/common/man.png'
        },
        {
          id: 121,
          name: '王乐乐',
          avatar: '/images/common/man.png'
        },
        {
          id: 231,
          name: '刘立军',
          avatar: '/images/common/man.png'
        },
        {
          id: 241,
          name: '王明涵',
          avatar: '/images/common/man.png'
        },
        {
          id: 122,
          name: '王乐乐',
          avatar: '/images/common/man.png'
        },
        {
          id: 232,
          name: '刘立军',
          avatar: '/images/common/man.png'
        },
        {
          id: 242,
          name: '王明涵',
          avatar: '/images/common/man.png'
        },
      ];

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
    console.log('submit')
  }
}
