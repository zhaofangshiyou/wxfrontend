import axios from 'axios';
import qs from 'qs';

let base = '';
let instance = axios.create({
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
    
  })

let url = 'https://api.zfsyonline.com';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//后台接口
//获取油站列表
export const getStation = params => { return instance.get(`${url}/v1/backen/station`, { params: params }); };

//添加油站
export const addStation = params => { return instance.post(`${url}/v1/backen/station`, qs.stringify(params)); };

//导出excel表格
//export const outExcel = params => { return instance.get(`${url}/v1/backen/station/excel`, { params: params }); };

//获取城市列表
export const getProvince = params => { return instance.get(`${url}/v1/backen/region/provinces`, { params: params }); };

//油站初始化-编辑
export const editInitOil = (params,id) => { return instance.put(`${url}/v1/backen/station/upd/${id}`, qs.stringify(params)); };

//油站初始化-删除
export const deleteInitOil = (params) => { return instance.delete(`${url}/v1/backen/station/del`, {data : qs.stringify(params)}); };

//油枪油品设置-获取油品列表
export const getOilGunList = params => { return instance.get(`${url}/v1/backen/oil/gum`, { params: params }); };

//获取油品列表
export const getOilProduct = params => { return instance.get(`${url}/v1/backen/oil`, { params: params }); };

//新增油品油枪关系 /gum/add
export const addOilGun = params => { return instance.post(`${url}/v1/backen/oil/gum/add`, qs.stringify(params)); };

//获取油站接口
export const getStationList = params => { return instance.get(`${url}/v1/backen/station/site`, { params: params }); };

//油站油枪状接口获取
export const getGunStatus = (params,id) => { return instance.get(`${url}/v1/backen/oil/gum/status/${id}`, { params: params }); };

//修改油品与油枪关系
export const editGunOil = (params,id) => { return instance.put(`${url}/v1/backen/oil/gum/upd/${id}`, qs.stringify(params)); };

//删除油品油枪关系
export const deleteOilGun = (params) => { return instance.delete(`${url}/v1/backen/oil/gum/del`, {data : qs.stringify(params)}); };

//油品价格设置
//初始化及分页
export const getOilPrice = (params) => { return instance.get(`${url}/v1/backen/oil/price`, { params: params }); };

//新增油品油价关系 /price/add
export const addOilPrice = params => { return instance.post(`${url}/v1/backen/oil/price/add`, qs.stringify(params)); };

//根据省份ID修改油品与油枪价关系 
export const editOilPrice = (params,id) => { return instance.put(`${url}/v1/backen/oil/price/upd/province/${id}`, qs.stringify(params)); };

//删除油品油价关系 /price/del
export const deleteOilPrice = (params) => { return instance.delete(`${url}/v1/backen/oil/price/del`, {data : qs.stringify(params)}); };

//财务管理模块

//消费明细
export const getConsumeDetail = (params) => { return instance.get(`${url}/v1/backen/consume/detail`, { params: params }); };

//消费汇总列表 /consume
export const getConsumeAll = (params) => { return instance.get(`${url}/v1/backen/consume`, { params: params }); };

//充值明细列表 /recharge/detail
export const getRechargeDetail = (params) => { return instance.get(`${url}/v1/backen/recharge/detail`, { params: params }); };

//充值汇总列表 /recharge
export const getRechargeAll = (params) => { return instance.get(`${url}/v1/backen/recharge`, { params: params }); };

//往来账列表 /acounts
export const getRunAcounts = (params) => { return instance.get(`${url}/v1/backen/accounts`, { params: params }); };

//发票接口 /v1/backen/invoice
export const getInvoice = (params) => { return instance.get(`${url}/v1/backen/invoice`, { params: params }); };

//开发票 
export const operatorInvoice = params => { return instance.post(`${url}/v1/backen/invoice`, qs.stringify(params)); };

//获取优惠信息列表 /
export const getDiscount = (params) => { return instance.get(`${url}/v1/backen/discount/`, { params: params }); };

//新增优惠 /add
export const discountAdd = params => { return instance.post(`${url}/v1/backen/discount/add`, qs.stringify(params)); };

//修改优惠  /upd/:id
export const editDiscount = (params,id) => { return instance.put(`${url}/v1/backen/discount/upd/${id}`, qs.stringify(params)); };

//删除列表 /del
export const deleteDiscount = (params) => { return instance.delete(`${url}/v1/backen/discount/del`, {data : qs.stringify(params)}); };

//优惠文案bianji编辑
export const discountDocAdd = params => { return instance.post(`${url}/v1/backen/discount/doc/add`, qs.stringify(params)); };
