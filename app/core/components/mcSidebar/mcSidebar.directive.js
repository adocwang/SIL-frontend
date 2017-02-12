class McSiderbarController {

  constructor(mcSidebarService) {
    'ngInject';

    this.menuItems = mcSidebarService.getMenuItems();
    this.info = {
      name: '浦发 | 投贷联动',
      avatar: '/images/common/logo.png'
    };
  }

}

function McSiderbarDirective() {

  return {
    restrict: 'E',
    templateUrl: 'core/components/mcSidebar/mcSidebar.html',
    controller: McSiderbarController,
    controllerAs: 'sidebar',
    link: (scope, element, attrs) => {
      let $side = element[0].childNodes[0];
      scope.menuHeight = $side.clientHeight - 160;
    }
  };

}

export default McSiderbarDirective;
