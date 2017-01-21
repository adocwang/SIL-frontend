import angular        from 'angular';

import ProfileService from './profile.service';

import AccessControlService from './accessControl.service';
import DistrictService from './district.service';

export default angular.module('app.common.services', [])
.service('ProfileService', ProfileService)
.service('AccessControlService', AccessControlService)
.service('DistrictService', DistrictService)
;