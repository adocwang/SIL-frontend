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
}

export default api;