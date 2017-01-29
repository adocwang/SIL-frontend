import angular          from 'angular';
import {mainHeader}     from './mcMainHeader/mcMainHeader';
import {contentHeader}  from './mcContentHeader/mcContentHeader';

import sidebarDirective from './mcSidebar/mcSidebar.directive';
import sidebarService   from './mcSidebar/mcSidebar.service';
import * as helper      from './mcSidebar/mcSidebarHelpers.directive';

import {mcPagination}   from './mcPagination/index';

import PickerService    from './mcPicker/picker';

// import PlanModelService    from './mcCarePlan/planModel';

// import careTypeService    from './mcCarePlan/careType';


export default angular.module('app.core.components', [])

// layout component
.component('mcMainHeader', mainHeader)
.directive('mcMainSidebar', sidebarDirective)
.service('mcSidebarService', sidebarService)
.component('mcContentHeader', contentHeader)

// sidebar
.directive('mcSidebarTogglingItem', helper.mcSidebarTogglingItem)
.directive('mcUiSrefTogglingSubmenu', helper.mcUiSrefTogglingSubmenu)
.directive('mcUiSrefToggler', helper.mcUiSrefToggler)

.component('mcPagination', mcPagination)

.service('PickerService', PickerService)

// .service('PlanModelService', PlanModelService)

// .service('careTypeService', careTypeService)
;
