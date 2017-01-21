/**
 * 让指定元素自适应
 * 参数:
 *  subWidth:
 *  parent: （可选）是否向上查找target指定的元素。依赖target属性。
 *  target: （可选）要查找的自适应的目标元素选择器。若没有指定target，则以指令当前元素为target。
 *
 * 示例:
 *   <div class="modal-body" resizable="{subWidth: 135, parent: true, target: '.modal-dialog'}"> ... <div>
 */
export default function resizable($window, $parse) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {

      let opts = $parse(attrs.resizable)(scope);
      let winWidth = $window.innerWidth;

      let $target = opts.target ?
        angular.element(element)[opts.parent ? 'parents' : 'find'](opts.target) :
        angular.element(element);

      function onResize(isFirst) {
        winWidth = $window.innerWidth;
        $target.css('width', winWidth - getScrollbarWidth() - opts.subWidth);

        if(!isFirst) scope.$digest();
      }

      onResize(true); // resize on first

      angular.element($window).on('resize', onResize);

      scope.$on('$destroy', () => {
        angular.element($window).off('resize', onResize);
      });

    }
  }

}

function getScrollbarWidth() {
  // Create the measurement node
  var scrollDiv = document.createElement("div");
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}
