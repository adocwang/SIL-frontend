/**
 * 列表页面的分类过滤
 */
export default function FilterListDirective($parse) {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {
      list: '=',
      filters: '=',
      title: '@',
      ctrlName: '@',
      filterKey: '@',
      itemName: '@',
      itemId: '@',
      clazz: '@'
    },
    templateUrl: 'common/directives/filter-list/filter-list.html',
    replace: true,
    link: function postLink(scope, element, attrs) {

      var listCtrl = scope.$parent[scope.ctrlName || '$ctrl'];

      scope.clearKeywordFilter =  (val) => {
        let params = {};
        params[scope.filterKey] = val;

        listCtrl.clearKeywordFilter.bind(listCtrl, params)();
      }

    }
  }
}
