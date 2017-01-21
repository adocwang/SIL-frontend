// https://github.com/angular-ui/bootstrap/issues/5331
// 作废。在多重弹框的情况下，关闭上层的，会导致底层的无法滚动
export default function uibModalDecorator($delegate) {
  'ngInject';

  var baseOpen = $delegate.open;

  $delegate.open = function() {
    var options = arguments[0];
    var openedClass = 'modal-open';
    if (options) {
      openedClass = options.openedClass || openedClass;
      options.openedClass = "ignoreThisClass"
    }
    var mi = baseOpen.apply(this, arguments);
    var body = angular.element(document.body);
    body.addClass(openedClass);

    // Use result finally, because for whatever reason, closed never resolves
    mi.result.finally(function() {
      body.removeClass(openedClass);
    });

    return mi;
  };

  return $delegate;

}
