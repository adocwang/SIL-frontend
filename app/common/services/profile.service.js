'use strict';

export default class ProfileService {
    constructor($http, httpHelper, ApiMap) {
    'ngInject';
        this._http = $http;
        // this.$q = $q;
        this._httpHelper = httpHelper;

        this._api = ApiMap.person;

	    this.info = {
	      name: '亲',
	      avatar: '/images/common/man.png'
	    }

        this.user_id = localStorage.getItem('SIL_UID') || 0;

        if(this.user_id) {
            this.get({id: this.user_id});
        }

    }

    getInfo(){
        return this.info;
    }

    get(data) {
    
        // this._httpHelper.blockUI.start();

        return this._http.post(this._api.get, data).then(this._httpHelper.verify,  this._httpHelper.error).then(data => {
            this.info.name = data.true_name;
        });
    }
}