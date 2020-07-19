// 所有的api定义到这里统一管理
const API_BASE = window.location.origin + '/rpa/api/console';
export const API = {
	TEST_API: '/rpa/api/console/project/queryMyProjects',
	DEVELOPER_CREATE_DEVELOPER_POST: "/rpa/api/mms/isv/createIsv", // 新增开发商
	DEVELOPER_UPDATE_DEVELOPER_POST: "/rpa/api/mms/isv/updateIsv", // 编辑开发商
	DEVELOPER_DEVELOPER_DETAIL_GET: "/rpa/api/mms/isv/queryIsvDetails", // 查询开发商详情
	DEVELOPER_DEVELOPER_LIST_GET: "/rpa/api/mms/isv/queryIsvs", // 开发商列表

	APP_CATEGORY_LIST_GET: "/rpa/api/mms/appCategory/queryAppCategorys", // 应用类别列表
	APP_CATEGORY_CREATE_POST: "/rpa/api/mms/appCategory/createAppCategory", // 创建引用类别
	APP_CATEGORY_UPDATE_POST: "/rpa/api/mms/appCategory/updateAppCategory", // 更新应用类别
	APP_CATEGORY_UPDATE_AUDIT_INFO_POST: "/rpa/api/mms/appCategory/updateAppCategoryAuthenticationInfo", // 更新审核信息

	APP_APP_LIST_GET: "/rpa/api/mms/app/queryApp", // app列表
	APP_APP_DETAIL_GET: "/rpa/api/mms/app/queryDetail", // app详情
	
	APP_AUDIT_LIST_GET: "/rpa/api/mms/Approve/queryApprove", // app审核列表
	APP_AUDIT_APPROVE_POST: "/rpa/api/mms/Approve/approve", // 审核通过
	APP_AUDIT_REJECT_POST: "/rpa/api/mms/Approve/reject", // 审核驳回
	APP_AUDIT_RECORD_DETAIL: "/rpa/api/mms/Approve/queryDetail", // 审核记录详情

	USER_LOGIN: '/user/login',
	USER_REGISTER: '/user/register'

};
// Object.keys(API).forEach(key => {
// 	API[key] = API_BASE + API[key];
// });