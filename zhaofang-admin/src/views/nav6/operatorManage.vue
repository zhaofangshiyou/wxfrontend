<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="角色">
					<el-select v-model="role" clearable placeholder="请选择" >
                        <el-option
                        v-for="item in role_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="addForm.role" placeholder="请输入油站名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
					<el-select v-model="role" clearable placeholder="请选择" >
                        <el-option
                        v-for="item in role_list"
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
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province" label="操作员名称" width="200">
			</el-table-column>
            <el-table-column prop="province" label="登入账号">
			</el-table-column>
            <el-table-column prop="province" label="操作员角色">
			</el-table-column>
            <el-table-column prop="province" label="状态">
			</el-table-column>
            <el-table-column prop="province" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
					<el-input v-model="addForm.role" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入账号">
					<el-input v-model="addForm.role" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登入密码">
					<el-input v-model="addForm.role" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="操作员角色">
                    <el-select v-model="addForm.menu_list" multiple placeholder="请选择" size="100">
                        <el-option
                        v-for="item in allMenu"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="范围选择">
                    <el-select v-model="addForm.menu_list" multiple placeholder="请选择" size="100">
                        <el-option
                        v-for="item in allMenu"
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
			<el-form :model="editForm" label-width="80px" ref="addForm">
				<el-form-item label="角色名称">
					<el-input v-model="editForm.role" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="权限设置">
                    <el-select v-model="editForm.menu_list" multiple placeholder="请选择" size="100">
                        <el-option
                        v-for="item in allMenu"
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
    import { getOilProduct,getStation, addStation, getProvince, editInitOil,deleteInitOil } from '../../api/api';
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
                role: '',
				addForm: {
                    role: '',
                    menu_list: []
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: '',
                    name: '',
                    account: '',
                    password: '',
                    role: '',
                    station_list: []
				},
                total: 0,
                page_num: 1,
                num: 10,
                allMenu:[
                    {name: '油站初始化', id: 10},
                    {name: '油枪油品设置', id: 11},
                    {name: '油品价格设置', id: 12},
                    {name: '消费明细', id: 20},
                    {name: '消费汇总', id: 21},
                    {name: '充值明细', id: 22},
                    {name: '充值汇总', id: 23},
                    {name: '往来账', id: 24},
                    {name: '优惠信息', id: 30},
                    {name: '优惠规则文案表', id: 31},
                    {name: '发票管理', id: 40},
                    {name: '已开票撤销', id: 41},
                    {name: '用户管理', id: 50},
                    {name: '用户消费明细', id: 51},
                    {name: '角色管理', id: 60},
                    {name: '操作员管理', id: 61},
                ]
            }
        },
        created:function() {
            
        },
        methods: {

            getList(province_id,id,page_num,num) {
                this.listLoading = true;
                let params = {
                    province_id: province_id,
                    id: id,
                    page_num: page_num,
                    num: num
                };
                getStation(params).then(res => {
                    this.listLoading = false;
                    if(res.data.status===0) {
                        this.initList = res.data.data.station_list;
                        this.pro_list = res.data.data.province_list;
                        this.total = res.data.data.station_num;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            addStation(province_id,name,oil_gum_nums,address,province,oil_list,type,avatar_url,city) {
                let params = {
                    id: '',
                    province_id: province_id,
                    name: name,
                    oil_gum_nums: oil_gum_nums,
                    province: province,
                    address: address,
                    oil_list: oil_list,
                    avatar_url: this.editForm.avatar_url,
                    city: this.editForm.city,
                    type: type
                }
                addStation(params).then(res =>{
                    if(res.data.status === 0) {
                        messageWarn('添加成功');
                        this.addFormVisible = false;
                        this.getList(this.provice,this.station,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //提交新增
            addSubmit: function() {
                let  oil_list = this.addForm.oil_list.join(',');
                this.addStation(this.addForm.province_id,this.addForm.name,this.addForm.oil_gum_nums,this.addForm.address,this.addForm.province,oil_list,this.addForm.type);

            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    role: '',
                    menu_list: []
                };
            },
            //查询
            searchList: function() {
                this.page_num = 1;
                this.getList(this.provice,this.station,this.page_num,this.num); 
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                let temp_arr = [];
                for(let i=0; i<row.oil_id_list.length; i++) {
                    temp_arr.push(row.oil_id_list[i].oil_id);
                }
                this.editForm.oil_list = temp_arr;
            },

            //编辑提交
            editSubmit() {
                let oil_list = this.editForm.oil_list.join(',');
                let param = {
                    province_id: this.editForm.province_id,
                    name: this.editForm.name,
                    oil_gum_nums: this.editForm.oil_gum_nums,
                    address: this.editForm.address,
                    province: this.editForm.province,
                    oil_list: oil_list,
                    avatar_url: this.editForm.avatar_url,
                    city: this.editForm.city,
                    type: this.editForm.type
                }
               editInitOil(param,this.editForm.id).then(res => {
                   if(res.data.status === 0) {
                       messageWarn('编辑成功');
                       this.editFormVisible = false;
                       this.getList();
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
                this.getList(this.province,this.station,this.page_num,this.num);
            },
            //导出表格
            outExcelTable() {
                window.open('https://api.zfsyonline.com/v1/backen/station?act=export&province_id='+this.provice+'&id='+this.station, '_blank');
            }
        },
    }
</script>

<style scoped>
    
</style>