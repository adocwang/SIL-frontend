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

    setSession(key, value) {
        if (key && value) {
            sessionStorage.setItem(key, value);
        }
    }

    getSession(key) {
        if (key) {
            return sessionStorage.getItem(key);
        }

        return null;
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
            this.info.role = data.role;
            this.setSession('SIL_ROLE', data.role);
            this.getUserAccess();
        });
    }

    hanldeAccess(data) {
        let accessList = angular.fromJson(data);
        if(accessList && accessList[this.info.role]) {
            let keys = Object.keys(this.access);
            keys.forEach(key => {
                if(!accessList[key]) {
                    delete this.access[key];
                }
            });
            angular.extend(this.access, accessList[this.info.role]);
        }
    }

    getUserAccess() {

        let access = this.getSession('SIL_ACCESS');

        if(access) {
            this.hanldeAccess(access);
        }

        this._configService.get(this.accessKey).then(data => {
            this.setSession('SIL_ACCESS', data);
            if (data) {
                this.hanldeAccess(data);
            }
        });
    }
}