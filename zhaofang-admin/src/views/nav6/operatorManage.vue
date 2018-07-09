<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="角色">
					<el-select v-model="role_id" clearable placeholder="请选择" >
                        <el-option
                        v-for="item in role_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="login" placeholder="请输入油站名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
					<el-select v-model="status" clearable placeholder="请选择" >
                        <el-option
                        v-for="item in status_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表-->
        <el-col :span="24" class="tab_header">
            <div class="tab_head_title">列表</div>
            <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <!-- <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button> -->
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="name" label="操作员名称" width="200">
			</el-table-column>
            <el-table-column prop="login" label="账号" width="200">
			</el-table-column>
            <el-table-column prop="role_name" label="操作员角色">
			</el-table-column>
            <el-table-column prop="station_name" label="可操作油站">
			</el-table-column>
            <el-table-column prop="status_name" label="状态" width="100">
			</el-table-column>
            <el-table-column prop="created_time" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{scope.row.status == 1? '禁用' : '启用'}}</el-button>
                </template>
			</el-table-column>
		</el-table>
        <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" ref="addForm">
				<el-form-item label="操作员名称">
					<el-input v-model="addForm.name" size="100" placeholder="请输入名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入账号">
					<el-input v-model="addForm.login" size="100" placeholder="请输入登入账号" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入密码">
					<el-input v-model="addForm.password" size="100" type="password" placeholder="请输入登入密码" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="操作员角色">
                    <el-select v-model="addForm.role" placeholder="请选择" size="100">
                        <el-option
                        v-for="item in role_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="范围选择">
                    <el-select v-model="addForm.station_list" multiple placeholder="请选择" @change="handleAddSelect" size="100">
                        <el-option
                            v-for="item in station_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                        </el-select>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" ref="addForm">
				<el-form-item label="操作员名称">
					<el-input v-model="editForm.name" size="100" placeholder="请输入名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入账号">
					<el-input v-model="editForm.login" size="100" placeholder="请输入登入账号" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入密码">
					<el-input v-model="editForm.password" size="100" type="password" placeholder="******" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="操作员角色">
                    <el-select v-model="editForm.role_id" placeholder="请选择" size="100">
                        <el-option
                        v-for="item in role_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="范围选择">
                    <el-select v-model="editForm.list" multiple placeholder="请选择" @change="handleEditSelect" size="100">
                        <el-option
                        v-for="item in station_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

    </section>
</template>

<script>
    import { getRoleList,getStation, getStationList,adminAdd, getAdmin, editAdmin,deleteInitOil } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    export default {
        data() {
            return {
                role_list: [],
                initList: [],
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
                //del_ids
                del_ids: [],
                station_list: [{id: 0, name: '全选'}],
                role: '',
				addForm: {
                    name: '',
                    login: '',
                    password: '',
                    role: '',
                    station_id: '',
                    station_list: []
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: '',
                    name: '',
                    login: '',
                    password: '',
                    role_id: '',
                    list: [],
				},
                total: 0,
                page_num: 1,
                num: 10,
                status_list: [
                    {id: 1, name: '启用'},
                    {id: 0,name: '禁用'}
                ],
                role_id: '',
                login: '',
                status: ''
            }
        },
        created:function() {
            this.getRoleList();
            this.getStation();
            this.getList(this.role_id,this.login,this.status,this.page_num,this.num);
        },
        methods: {
            //编辑范围选择变化
            handleEditSelect() {
                let index_id_0 = this.editForm.list.indexOf(0);
                if(index_id_0 > -1){
                    this.editForm.list.length = 0;
                    for(let i=1; i < this.station_list.length; i++) {
                        this.editForm.list.push(this.station_list[i].id);
                    }
                }
            },
            //新增范围选择变化
            handleAddSelect() {
                let index_id_0 = this.addForm.station_list.indexOf(0);
                if(index_id_0 > -1){
                    this.addForm.station_list.length = 0;
                    for(let i=1; i < this.station_list.length; i++) {
                        this.addForm.station_list.push(this.station_list[i].id);
                    }
                }
            },
            //获取油站列表
            getStation() {
                let params = {
                    src: 'all'
                }
                getStationList(params).then(res => {
                    if(res.data.status===0) {
                        this.station_list = this.station_list.concat(res.data.data.station_site);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //获取角色列表
            getRoleList() {
                getRoleList({}).then(res => {
                    if(res.data.status === 0) {
                        this.role_list = res.data.data.role_list;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            getList(role_id,login,status,page_num,num) {
                let params = {
                    role_id: role_id,
                    login: login,
                    status: status,
                    page_num: page_num,
                    num: num
                };
                getAdmin(params).then(res => {
                    if(res.data.status === 0) {
                        this.initList = res.data.data.backen_user_list;
                        this.total = res.data.data.backen_user_cnt;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
                
            },
            adminAdd(name,login,password,role,station_id) {
                let params = {
                    name: name,
                    login: login,
                    password: password,
                    role: role,
                    station_id: station_id
                }
                adminAdd(params).then(res =>{
                    if(res.data.status === 0) {
                        messageWarn('添加成功');
                        this.addFormVisible = false;
                        this.getList(this.role_id,this.login,this.status,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //提交新增
            addSubmit: function() {
                if(this.addForm.station_list.length === 0) {
                     messageWarn('范围选择不能为空');
                     return;
                }
                let  station_id = this.addForm.station_list.join(',');
                this.adminAdd(this.addForm.name,this.addForm.login,this.addForm.password,this.addForm.role,station_id);

            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    name: '',
                    login: '',
                    password: '',
                    role: '',
                    station_id: '',
                    station_list: []
                }
            },
            //查询
            searchList: function() {
                this.page_num = 1;
                this.getList(this.role_id,this.login,this.status,this.page_num,this.num); 
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm.list.length = 0;
                this.editForm.id = row.id;
                this.editForm.name = row.name;
                this.editForm.login = row.login;
                this.editForm.password = '';
                this.editForm.role_id = Number(row.role_id);
                 var tempStation = [];
                if(row.station_id == '*') {
                    for(let j=1;j < this.station_list.length; j++) {
                        this.editForm.list.push(Number(this.station_list[j].id));
                    }
                }else{
                   tempStation = row.station_id.split(',');
                   for(let i=0; i<tempStation.length; i++) {
                        this.editForm.list.push(Number(tempStation[i]));
                    }
                } 
                
            },

            //编辑提交
            editSubmit() {
                let list = '';
                if(this.editForm.list.length === 0){
                    messageWarn('范围选择不能为空');
                    return;
                }

                if(this.editForm.list.length == this.station_list.length) {
                    list = '*';
                }else{
                    list = this.editForm.list.join(',');
                }
                let param = {
                    name: this.editForm.name,
                    login: this.editForm.login,
                    password: this.editForm.password,
                    role: this.editForm.role_id,
                    station_id: list
                }
               editAdmin(param,this.editForm.id).then(res => {
                   if(res.data.status === 0) {
                       messageWarn('编辑成功');
                       this.editFormVisible = false;
                       this.getList(this.role_id,this.login,this.status,this.page_num,this.num); 
                   }else{
                       messageWarn(res.data.msg); 
                   }
               })    
            },
            selsChange: function (sels) {
                this.del_ids.length = 0;
                for(let i=0; i<sels.length; i++) {
                    this.del_ids.push(sels[i].id)
                }
				//this.sels = sels;
            },
            //批量删除
            batchRemove: function() {
                this.$confirm('确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let params = {
                        station_id: JSON.stringify(this.del_ids)
                    }
					deleteInitOil(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList(this.province,this.station,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            handleCurrentChange(val) {
                this.page_num = val;
                this.getList(this.role_id,this.login,this.status,this.page_num,this.num);
            },
            handleDel: function(index,row) {
                 this.$confirm('是否修改用户状态?', '提示', {
					type: 'warning'
				}).then(() => {
                    this.listLoading = true;
                    let status = "";
                    if(row.status == 0) {
                        status = 1;
                    }else{
                        status = 0;
                    }
                    
                    let params = {
                        status: status
                    }
					editAdmin(params,row.id).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getList(this.role_id,this.login,this.status,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            //导出表格
            outExcelTable() {
                let data = '&id='+ this.role_id + '&login=' + this.login + '&status=' + this.status; 
                window.open(this.GLOBAL.url + '/backen/users/list?act=export'+data, '_blank');
            }
        },
    }
</script>

<style scoped>
    
</style>