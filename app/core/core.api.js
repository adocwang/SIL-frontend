'use strict';
const prefix = 'http://silapi.adoc.wang';
const api = {
	config: {
		get: `${prefix}/client_config/list/web`,
		getSpecial: `${prefix}/client_config/get_special/{key}`,
		setSpecial: `${prefix}/client_config/set_special`,
	},
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
	},
	bank: {
		get: `${prefix}/bank/list`
	},
	log: {
		list: `${prefix}/log/list`
	},
}

export default api;