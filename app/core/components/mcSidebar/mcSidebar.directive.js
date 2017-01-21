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
      scope.menuHeight = element[0].childNodes[0].clientHeight;
    }
  };

}

export default McSiderbarDirective;
