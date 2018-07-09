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
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="name" label="角色名称" width="200">
			</el-table-column>
            <el-table-column prop="created_time" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
			<el-form :model="addForm" label-width="80px" ref="addForm" v-if="addFormVisible">
				<el-form-item label="角色名称">
					<el-input v-model="addForm.role" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="权限设置">
                    <el-tree
                    :data="data2"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expanded-keys="[]"
                    :default-checked-keys="[]"
                    :props="defaultProps">
                    </el-tree>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="addForm" v-if="editFormVisible">
				<el-form-item label="角色名称">
					<el-input v-model="editForm.name" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="权限设置">
                    <el-tree
                    :data="data2"
                    show-checkbox
                    node-key="id"
                    ref="treeEdit"
                    :default-expanded-keys="[]"
                    :default-checked-keys="editForm.menu_list"
                    :props="defaultProps">
                    </el-tree>
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
    import { getRole, roleAdd, getRoleList,editRole } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    export default {
        data() {
            return {
                chooseAll: false,
                role_list: [],
                initList: [],
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
                //del_ids
                del_ids: [],
                role_id: '',
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
                    menu_list: []
				},
                total: 0,
                page_num: 1,
                num: 10,
                data2: [ 
                    {
                        id: 1,
                        label: '油站管理',
                        children: [
                            {label: '油站初始化', id: 10}, 
                            {label: '油枪油品设置', id: 11}, 
                            {label: '油品价格设置', id: 12}
                        ]
                    },
                    {
                        id: 2,
                        label: '财务管理',
                        children: [
                            {label: '消费明细', id: 20}, 
                            {label: '消费汇总', id: 21}, 
                            {label: '充值明细', id: 22},
                            {label: '充值汇总', id: 23}, 
                            {label: '往来账', id: 24},
                        ]
                    },
                    {
                        id: 3,
                        label: '优惠信息',
                        children: [
                            {label: '优惠信息', id: 30}, 
                            {label: '优惠规则文案表', id: 31}, 
                        ]
                    },
                    {
                        id: 4,
                        label: '发票管理',
                        children: [
                            {label: '发票管理', id: 40}, 
                            {label: '已开票撤销', id: 41}, 
                        ]
                    },
                    {
                        id: 5,
                        label: '用户管理',
                        children: [
                            {label: '用户消费明细', id: 50}, 
                            {label: '用户基本信息', id: 51}, 
                        ]
                    },
                    {
                        id: 6,
                        label: '权限管理',
                        children: [
                            {label: '角色管理', id: 60}, 
                            {label: '操作员管理', id: 61}, 
                        ]
                    },
                    {
                        id: 7,
                        label: '全局配置',
                        children: [
                            {label: '全局配置', id: 70}, 
                        ]
                    },
                ],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    }
            }
        },
        created:function() {
           this.getList(this.role_id,this.page_num,this.num); 
           this.getRoleList();
        },
        methods: {
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
            getList(id,page_num,num) {
                this.listLoading = true;
                let params = {
                    id: id,
                    page_num: page_num,
                    num: num
                };
                getRole(params).then(res => {
                    this.listLoading = false;
                    if(res.data.status===0) {
                        this.initList = res.data.data.role_list;
                        this.total = res.data.data.role_list_cnt;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            addRole(role,permissions) {
                let params = {
                    name: role,
                    permissions: permissions
                }
                roleAdd(params).then(res =>{
                    if(res.data.status === 0) {
                        messageWarn('添加成功');
                        this.addFormVisible = false;
                        this.getList(this.role_id,this.page_num,this.num); 
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //提交新增
            addSubmit: function() {
                let permissions = JSON.stringify(this.$refs.tree.getCheckedKeys());
                this.addRole(this.addForm.role,permissions);

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
                this.getList(this.role_id,this.page_num,this.num); 
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                this.editForm.menu_list = JSON.parse(row.permissions);
            },

           
            //编辑提交
            editSubmit() {
                let param = {
                  id: this.editForm.id,
                  name: this.editForm.name,
                  permissions: JSON.stringify(this.$refs.treeEdit.getCheckedKeys())
                }
               editRole(param,this.editForm.id).then(res => {
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
            handleCurrentChange(val) {
                this.page_num = val;
                this.getList(this.role_id,this.page_num,this.num);
            },
            //导出表格
            outExcelTable() {
                let data = '&id='+ this.role_id; 
                window.open(this.GLOBAL.url + '/backen/roles/list?act=export'+data, '_blank');
            }
        },
    }
</script>

<style scoped>
    
</style>