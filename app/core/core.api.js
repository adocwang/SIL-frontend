'use strict';
const prefix = 'http://silapi.adoc.wang';
const api = {
	config: {
		list: `${prefix}/client_config/list/web`,
		get: `${prefix}/client_config/get_special/{key}`,
		set: `${prefix}/client_config/set_special`,
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
		get: `${prefix}/bank/list`,
		add: `${prefix}/bank/add`,
		set: `${prefix}/bank/set`
	},
	log: {
		list: `${prefix}/log/list`
	},
	process: {
		tipsList: `${prefix}/cm_tip/list`,
		tipsGet: `${prefix}/cm_tip/get/{id}`,
		tipsSet: `${prefix}/cm_tip/set`,
		tipsAdd: `${prefix}/cm_tip/add`
	},
	filter: {
		blacklist: {
			list: `${prefix}/blacklist/list`,
			add: `${prefix}/blacklist/add`,
			del: `${prefix}/blacklist/del`,
		}
	}
}

export default api;