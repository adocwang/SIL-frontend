class BackTopController {

  constructor($scope, element, attrs, $window) {
    'ngInject';

    let $win = angular.element($window),
        $ele = angular.element(element);

    $win.scroll(function(){
        if ($win.scrollTop() <= 0) {
            $ele.fadeOut();
        }else {
            $ele.fadeIn();
        }
    });

    $ele.on('click', function(){
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });
  }

}

export const backTop = {
  templateUrl: 'common/components/backTop/backTop.html',
  controller: BackTopController,
  bindings: {

  }
};
