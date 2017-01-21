export default class BaseListCtrl {

  constructor($injector, config) {

    this.$stateParams  = $injector.get('$stateParams');
    this.$location     = $injector.get('$location');
    this.httpHelper    = $injector.get('httpHelper');
    this.AreaService   = $injector.get('AreaService');
    this.AppSettings   = $injector.get('AppSettings');

    //this.xxx = $injector.get('xxx');

    this.areaList      = this.AreaService.getList();
    this.statusList    = this.AppSettings.statusList;  // 状态
    this.oldTypeList   = this.AppSettings.oldTypeList;
    this.oldStatusList = this.AppSettings.oldStatusList;
    this.pagination    = this.AppSettings.pagination;  // 分页

    this.filters = angular.extend({
      page: 1
    }, this.$stateParams, config.filters);

  }

  /**
   * 需在子Controller中调用此方法。
   * 若要重载此方法，应在重载方法中先调用super._init()
   *
   * opts: 参数配置
   *   numberKeys(Array): 来自url的请求参数将被从字符串转为整数
   */
  _init(opts) {

    this.httpHelper.blockUI.start();

    if(!this._assertInvoke('_getParams', 'searchFun')) return;

    // 获取搜索参数
    this._getParams(opts);

    // 请求数据
    this.searchFun();

  }

  // 根据参数重新查询
  reSearch() {

    this.$location.search(angular.merge({}, this.filters, {
      page: 1 // 改变状态后页码重置为1
    }));

  }

  /**
   * 分页事件（刷新页面，并根据请求参数重新筛选）
   */
  pageChanged() {
    this.$location.search( this.filters );

  }

  /**
   * 过滤掉空值请求参数（null, undefined等）
   * TODO: 以opts形式提供, 或放到baseService中
   */
  filterNullFilter(filters){

    let tempFilter = angular.copy(filters);
    for(let i in tempFilter){
        if(!tempFilter[i]){
            delete tempFilter[i];
        }
    }

    return tempFilter;
  }

  clearKeywordFilter(data){

    this.toggleFilter(angular.extend(data, {
      searchCol: null,
      searchType: null,
      keyword: null
    }));

  }

  toggleFilter(filter){

    this._setParams(filter, true);

  }

  /**
   * 设置查询参数到Controller
   *   data(Object): 查询参数
   *   isAutoRefresh(Boolean): 是否自动刷新页面
   */
  _setParams(data, isAutoRefresh) {

    for(let i in data){
      if(this.filters[i] == data[i]){
        this.filters[i] = undefined;
      }else{
        this.filters[i] = data[i];
      }
    }

    if(isAutoRefresh)
      this.reSearch();

  }

  /**
   * 从$stateParams中获取查询参数
   */
  _getParams(opts) {

    if(!opts) return;

    for(let i in this.filters){
      if(this.$stateParams[i]){
        this.filters[i] = opts.numberKeys.includes(i) ? +this.$stateParams[i] : this.$stateParams[i];
      }
    }

  }

  remove(type, id, index){

    let that = this;

    this.sweet.show({
      title: '确认删除这条数据吗？',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnConfirm: true,
      imageUrl: '/dist/images/common/warning.png'
    }, function(sure){
      if(sure){
          // this.operationService.remove(type, id).then(function( res ){
          //     toastr.success('操作已完成！', '提示');
          //     that.list.splice(index,1);
          // });
      }else{
          return;
      }
    });

  }

  _assertInvoke(...funcs) {

    let success = true;
    funcs.forEach(func => {
      if(!this[func]) {
        console.warn(`There is no invoke ${func}() in controller`);
        success = false;
        return;
      }
    });
    return success;

  }

}
