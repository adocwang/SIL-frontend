'use strict';

export default class ProfileService {
    constructor() {
    'ngInject';

	    this.info = {
	      name: 'niubi',
	      avatar: '/images/common/man.png'
	    }

    }

    getInfo(){
        return this.info;
    }
}