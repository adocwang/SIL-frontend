class McSidebarTogglingItemController {

  constructor($scope, $element, $attrs, $state, mcSidebarService) {
    'ngInject';

    this._$element = $element;

    let menuItem = this.$$menuItem = $scope.$eval($attrs.mcSidebarTogglingItem);

    if (menuItem && menuItem.subMenu && menuItem.subMenu.length) {
      this.$$expandSubmenu = () => { console.warn('$$expandMenu should be overwritten by mcUiSrefTogglingSubmenu') };
      this.$$collapseSubmenu = () => { console.warn('$$collapseSubmenu should be overwritten by mcUiSrefTogglingSubmenu') };

      this.subItemsStateRefs = mcSidebarService.getAllStateRefsRecursive(menuItem);

      if (this.isState($state.current)) {
        $element.addClass('sidebar-item-expanded');
      }

      $scope.$on('$stateChangeStart', (event, toState) => {
         if (!this.isState(toState) && $element.hasClass('sidebar-item-expanded')) {
          this.$collapse();
          $element.removeClass('sidebar-item-expanded');
        }
      });

      $scope.$on('$stateChangeSuccess', (event, toState) => {
        if (this.isState(toState) && !$element.hasClass('sidebar-item-expanded')) {
          this.$expand();
          $element.addClass('sidebar-item-expanded');
        }
      });
    }

  }

  $expand() {
    this.$$expandSubmenu();
    this.$collapseOther(this.$collapseOther(this._$element));
    this._$element.addClass('sidebar-item-expanded');
  }

  $collapse() {
    this.$$collapseSubmenu();
    this._$element.removeClass('sidebar-item-expanded');
  };

  $toggle() {
    this._$element.hasClass('sidebar-item-expanded') ? this.$collapse() : this.$expand();
  };

  isState(state) {
    return state && this.subItemsStateRefs.some( subItemState => {
      return state.name.indexOf(subItemState) == 0;
    });
  }

  // hack: collapse other menu when expand one
  // TODO: use directive feture, no element manipulate
  $collapseOther(element) {
    let siblings = angular.element(element).siblings('.sidebar-item-expanded');
    siblings.find('.sidebar-sublist').hide();
    siblings.removeClass('sidebar-item-expanded');
  }

}

export default McSidebarTogglingItemController;
