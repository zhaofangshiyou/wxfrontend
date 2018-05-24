import axios from 'axios';
import qs from 'qs';

let base = '';
let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
 
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
