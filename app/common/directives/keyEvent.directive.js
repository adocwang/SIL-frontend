/**
 * @description 键盘事件监听和执行
 * @property {Number} code 所敲击的某个键的keyCode, 如果要监听回车键，设置为13即可
 * @example
 * <input ng-model="keyword" type="text" code="13" key-event="searchByKeyword(keyword);">
 */
export default function keyEvent() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.bind('keypress', function(event) {
        let keyCode = event.which || event.keyCode;

        if(keyCode == $attrs.code) {
          $scope.$apply(() => $scope.$eval($attrs.keyEvent, {$event: event}) );

          event.preventDefault();
        }
      });
    }
  }

}
