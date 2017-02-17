'use strict';

export default class ProfileService {
    constructor($http, httpHelper, AppSettings, ApiMap, ConfigService) {
    'ngInject';
        this._http = $http;
        // this.$q = $q;
        this._httpHelper = httpHelper;

        this._api = ApiMap.person;
        this._apiMap = ApiMap;

        this.accessKey = AppSettings.accessKey;

        this._configService = ConfigService;

	    this.info = {
	      name: '亲',
	      avatar: '/images/common/man.png'
	    }

        this.user_id = localStorage.getItem('SIL_UID') || 0;

        this.access = {};

        if(this.user_id) {
            this.get({id: this.user_id});
        }

    }

    getInfo(){
        return this.info;
    }

    getAccess() {
        return this.access;
    }

    get(data) {
    
        this._httpHelper.blockUI.start();

        return this._http.post(this._api.get, data).then(this._httpHelper.verify,  this._httpHelper.error).then(data => {
            this.info.name = data.true_name;
            this.role = data.role;
            this.getUserAccess();
        });
    }

    getUserAccess() {

        this._configService.get(this.accessKey).then(data => {
            if (data) {
                let accessList = angular.fromJson(data);
                if(accessList && accessList[this.role]) {
                    angular.extend(this.access, accessList[this.role]);
                }
            }
        });
    }
}