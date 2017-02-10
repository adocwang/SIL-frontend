import angular        from 'angular';

import ConfigService from './config.service';
import ProfileService from './profile.service';

import AccessControlService from './accessControl.service';
import DistrictService from './district.service';

export default angular.module('app.common.services', [])
.service('ConfigService', ConfigService)
.service('ProfileService', ProfileService)
.service('AccessControlService', AccessControlService)
.service('DistrictService', DistrictService)
;