'use strict';

export default class ProfileService {
    constructor() {
    'ngInject';

	    this.info = {
	      name: '您好',
	      avatar: '/images/common/man.png'
	    }

    }

    getInfo(){
        return this.info;
    }
}