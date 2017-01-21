export default class historyService{

  constructor($window) {
    'ngInject';
    this._window = $window;
  }
  back() {
    this._window.history.back();
  }
}
