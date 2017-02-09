class McSiderbarController {

  constructor(mcSidebarService, ProfileService) {
    'ngInject';

    this.menuItems = mcSidebarService.getMenuItems();
    this.info = ProfileService.getInfo();
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
