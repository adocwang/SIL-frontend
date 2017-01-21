export default class InlineNavController {

  constructor($state, $injector, $resolve, $scope) {
    'ngInject';


    this.resolveObject = $scope.$parent.$resolve;

    if(this.alias && this.resolveObject[this.alias]) {
      this.extraInfo = this.resolveObject[this.alias];
    }
    // this.extraInfo = $injector.get(this.alias);

    //console.log($state.get());
    //console.log(this.navList);

    if(this.btnList) this.btnListBackup = [...this.btnList];
    if(this.navList) this.navListBackup = [...this.navList];

    $scope.$watch('$ctrl.extraInfo._initTag', ()=>{
      this._init();
    });

  }

  _init () {
    if(this.navListBackup) {
      this.navList = this.navListBackup.filter(item => this._filterHandle(item));
    }
    if(this.btnListBackup && this.btnListBackup.length){
      this.btnList = this.btnListBackup.filter(item => this._filterHandle(item));
    }
  }

  _filterHandle(item) {
    if(item.expession ){
      if(this.extraInfo && Object.keys(this.extraInfo).length > 1 ){
        return this.handleExp(this.extraInfo, item.expession);
      } else {
        return false;
      }
    }

    return true;
  }

  handleExp(obj, exp) {

    const handler = new Function('with('+JSON.stringify(obj)+'){return '+exp+'}');

    return handler();
  }

  handleClick(item, e) {
    if(item.clickExpession) {
      if(this.extraInfo && Object.keys(this.extraInfo).length > 1 ){
        if(this.handleExp(this.extraInfo, item.clickExpession)){
          item.clickHandler && item.clickHandler();

          e.preventDefault();
          return false;
        }
      } else {
        return true;
      }

    }

    return true;
  }
}
