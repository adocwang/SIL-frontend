/**
 * @description 当列表没有数据时，显示提示
 */
export default function emptyListTipDirective() {
    return {
        restrict: 'EA',
        template: '<div class="row text-center text-muted" style="padding: 50px 0;">{{message}}</div>',
        replace: true,
        link: function (scope, element, attrs) {
            scope.message = attrs.message || '暂无数据 :-( ';
        }
    };
}
