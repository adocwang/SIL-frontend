export default class httpHelper{

  constructor(toastr, blockUI, AppSettings) {
    'ngInject';

    this._blockUIInstance = null;
    this._errorInfo = AppSettings.errorInfo;

    this.toastr = toastr;
    this.$blockUI = blockUI;


    this.blockUI = {
      start: this._startBlockUI.bind(this),
      stop: this._stopBlockUI.bind(this)
    };

    this.verify = this._verify.bind(this);
    this.error = this._error.bind(this);
  }
  // ========================= Methods =========================

  _verify(res) {

    this._stopBlockUI();

    return new Promise((resolve, reject) => {
      if(res.data.code === 0) {
        resolve(res.data.data);
      }else {
        this.toastr.error(this._errorInfo[res.data.code] || res.data.info, '错误');
        reject(res);
      }
    });

  }

  _error() {

    this.toastr.error('获取数据失败！', '错误');
    return new Promise((resolve, reject) => {
      this._stopBlockUI();

      reject();
    });

  }

  _startBlockUI(blockUIName) {
    // TODO reset on restart
    this.$blockUI.instances.reset();
    if(blockUIName) {
      this._blockUIInstance = this.$blockUI.instances.get(blockUIName);
      this._blockUIInstance.start();
    }else {
      if(this.$blockUI.isBlocking){
        this.$blockUI.stop();
      }
      this.$blockUI.start();
    }
  }

  _stopBlockUI() {
    if(this._blockUIInstance) {
      this._blockUIInstance.stop();
      this._blockUIInstance = null;
    }else {
      this.$blockUI.stop();
    }
  }

}
