'use strict';
const prefix = '/api/v1';
const api = {
	message: {
		getList: `${prefix}/message/getList`,
		get: `${prefix}/message/get`,
		read: `${prefix}/message/read`,
		delete: `${prefix}/message/del`,
	},
}

export default api;