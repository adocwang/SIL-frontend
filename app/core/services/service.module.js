import angular           from 'angular';
import httpHelper        from './httpHelper.service';
import imgPreLoadService from './imgPreLoad.service';
import checkStateService from './checkState.service';
import utilService       from './util.service';
import historyService    from './history.service';


export default angular.module('app.module.core.service', [])
.service('httpHelper', httpHelper)
.service('imgPreLoadService', imgPreLoadService)
.service('checkStateService', checkStateService)
.service('utilService', utilService)
.service('historyService', historyService)
;
