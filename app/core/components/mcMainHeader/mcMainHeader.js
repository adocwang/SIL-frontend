class McMainHeaderController {

  constructor(sweet, utilService, ProfileService) {
    'ngInject';

    this._sweet = sweet;
    this._utilService = utilService;

    // let {avatar} = PensionService.getInfo();

    this.info = ProfileService.getInfo();
  }

  logout() {
    this._sweet.show({
      title: '提示',
      text: '确认退出?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '退出',
      cancelButtonText: '取消'
    }, isConfirm => {
      if (isConfirm) {
        localStorage.clear();
        this._utilService.logout();
      }
    });
  }

}

export const mainHeader = {
  templateUrl: 'core/components/mcMainHeader/mcMainHeader.html',
  controller: McMainHeaderController,
  controllerAs: 'vm',
  bindings: {

  }
};
