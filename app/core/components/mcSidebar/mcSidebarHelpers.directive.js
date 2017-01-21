import McSidebarTogglingItemCtrl from './helpers/mcSidebarTogglingItem.ctrl'

export function mcSidebarTogglingItem() {
  return {
    restrict: 'A',
    controller: McSidebarTogglingItemCtrl
  };
}

export function mcUiSrefTogglingSubmenu($state) {
  'ngInject';

  return {
    restrict: 'A',
    require: '^mcSidebarTogglingItem',
    link: function(scope, el, attrs, mcSidebarTogglingItem) {
      mcSidebarTogglingItem.$$expandSubmenu = () => { el.slideDown(); };
      mcSidebarTogglingItem.$$collapseSubmenu = () => { el.slideUp(); };
    }
  };
}

export function mcUiSrefToggler(mcSidebarService) {
  'ngInject';

  return {
    restrict: 'A',
    require: '^mcSidebarTogglingItem',
    link: function(scope, el, attrs, mcSidebarTogglingItem) {
      el.on('click', () => {
        mcSidebarTogglingItem.$toggle();
      });
    }
  };

}
