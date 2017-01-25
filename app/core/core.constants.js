import _ from 'underscore';

const coreConstants = {
  appTitle: '管理后台',
  apiUrl: '/api/v1',
  errorInfo: {
    0: '请求成功',
    1001: '接口不存在',
    1002: '请求参数有误',
    2001: '未登录',
    2002: 'token过期',
  },
  date: {
    weeks : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months : _.range(1, 32) // 1-31号
  },
  
  //alarmTypeList: window.pageConf.alarmTypeList,
  cropOptions: {
    minContainerWidth: 140
  },
  roleConfig: [
    { role_config_id: 1, role_name: '超级管理员'},
    // { role_config_id: 6, role_name: '护工'}
  ],
  statusList: [{value: 0, name: '开启'}, { value: 1, name: '关闭'}],
  genderList: [{value: 1, name: '男'}, {value: 2, name: '女'}],
  pagination: { page: 1, pageSize: 18 }, // 默认分页
  modalAnimation: true,
};

export default coreConstants;
