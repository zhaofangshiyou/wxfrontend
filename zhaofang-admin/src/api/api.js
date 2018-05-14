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