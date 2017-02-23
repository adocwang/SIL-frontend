class McMainHeaderController {

  constructor(sweet, $timeout, toastr, utilService, ProfileService, MessageService) {
    'ngInject';

    this._sweet = sweet;
    this._utilService = utilService;

    this._msgService = MessageService;

    this._toastr = toastr;
    this._timeout = $timeout;

    // let {avatar} = PensionService.getInfo();

    this.info = ProfileService.getInfo();
    this.msg_count = 0;

    this.getMsg();
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

  getMsg() {
    this._msgService.getList({page: 1, page_limit: 10}, true).then(data => {
      let unreadList = data.messages.filter(item => item.state === 0);
      let len = unreadList.length;
      if (len > 0) {
        let newMsgId = unreadList[0].id;
        if ( newMsgId != this.newMsgId) {
          this._toastr.success(unreadList[0].content, '新消息');
          this.newMsgId = newMsgId;
        }
      }

      if (len > 9) {
        len = '9+';
      }

      this.msg_count = len;

      this._timeout(() => {
        this.getMsg();
      }, 120000);
      
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
