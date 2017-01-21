import angular          from 'angular';
import baseModule       from './base/base.module';
import componentsModule from './components/components.module';
import directivesModule from './directives/directives.module';
import servicesModule   from './services/services.module';
import filtersModule    from './filters/filters.module';
import mcRegExp         from './constants/regExpRule';


export default angular.module('app.common', [
  baseModule.name,
  componentsModule.name,
  servicesModule.name,
  directivesModule.name,
  filtersModule.name
])
.constant('mcRegExp', mcRegExp)
