'use strict';
const prefix = 'http://silapi.adoc.wang';
const api = {
	message: {
		getList: `${prefix}/message/list`,
		get: `${prefix}/message/{id}`,
		set: `${prefix}/message/set`,
	},
	investment: {
		getList: `${prefix}/vc_company/list`,
		set: `${prefix}/vc_company/set`,
		add: `${prefix}/vc_company/add`,
		downloadTemplate: `${prefix}/export/vc_company_template`,
		import: `${prefix}/import/vc_company`,
	},
	enterprise: {
		getList: `${prefix}/enterprise/list`,
		get: `${prefix}/enterprise/{id}`,
		set: `${prefix}/enterprise/set`,
	},
	person: {
		get: `${prefix}/user/get`,
		set: `${prefix}/user/set`,
		logout: `${prefix}/user/logout`,
		list: `${prefix}/user/list`,
		add: `${prefix}/user/add`
	},
	account:  {
		downloadTemplate: `${prefix}/export/user_template`,
		import: `${prefix}/import/user`,
	}
}

export default api;