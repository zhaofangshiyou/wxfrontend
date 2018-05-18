<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="provice" clearable placeholder="请选择" @change="selectOil($event)">
                        <el-option
                        v-for="item in pro_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="站点名称">
					<el-select v-model="station" clearable placeholder="请选择">
                        <el-option
                        v-for="item in oil_station"
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
            <div class="tab_head_title">油站分布列表</div>
            <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province" label="省份" width="150">
			</el-table-column>
			<el-table-column prop="name" label="站点名称" width="150">
			</el-table-column>
			<el-table-column prop="id" label="站点ID" width="150">
			</el-table-column>
			<el-table-column prop="oil_gum_nums" label="枪数" width="100">
			</el-table-column>
			<el-table-column prop="oil_list" label="油品信息" min-width="180">
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-select v-model="addForm.province_id" @change="selectGet" size="100" placeholder="请选择">
                        <el-option
                        v-for="item in add_provice_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="油站名称">
					<el-input v-model="addForm.name" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="枪数">
					<el-input v-model="addForm.oil_gum_nums" size="100" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="地址">
					<el-input v-model="addForm.address" size="100" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="油品信息">
                    <el-select v-model="addForm.oil_list" multiple placeholder="请选择" size="100">
                        <el-option
                        v-for="item in oil_product"
                        :key="item"
                        :label="item"
                        :value="item">
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
				<el-form-item label="省份" prop="name">
					<el-select disabled="true" v-model="editForm.province" size="100" placeholder="请选择">
                        <el-option
                        v-for="item in add_provice_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="油站名称">
					<el-input v-model="editForm.name" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="枪数">
					<el-input v-model="editForm.oil_gum_nums" size="100" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="油品信息">
                    <el-select v-model="editForm.oil_list" multiple placeholder="请选择" size="100">
                        <el-option
                        v-for="item in oil_product"
                        :key="item"
                        :label="item"
                        :value="item">
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
    import { getStation, addStation, getProvince, editInitOil,deleteInitOil } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    export default {
        data() {
            return {
                pro_list: [],
                initList: [],
                provice: '',
                station: '',
                oil_station: [],
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
				addForm: {
                    province_id: '',
					name: '',
                    oil_gum_nums: '',
                    address: '',
                    province: '',
                    oil_list: [],
                    avatar_url: '',
                    city: '',
                    type: ''
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: '',
                    province_id: '',
					name: '',
                    oil_gum_nums: '',
                    address: '',
                    province: '',
                    oil_list: [],
                    avatar_url: '',
                    city: '',
                    type: ''
				},
                add_provice_list: [],
                oil_product: ['92号','95号','98号','0号','-10号'],
                list: [],
                total: 0,
            }
        },
        created:function() {
            this.getProvince();
            this.getList();
        },
        methods: {
            getProvince() {
                getProvince().then(res => {
                    if(res.data.status === 0) {
                        this.add_provice_list = res.data.data.provinces;
                    }else {
                        messageWarn('获取城市失败');
                    }
                })
            },
            selectGet(vId) {
               let obj = {};
                obj = this.add_provice_list.find((item)=>{
                   return item.id === vId;
                });
                this.addForm.province = obj.name;
            },
            selectOil(event) {
                let obj = {};
                this.station = '';
                obj = this.pro_list.find((item)=>{
                   return item.id === event;
                });
                this.oil_station = obj.stations;
            },
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
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            addStation(province_id,name,oil_gum_nums,address,province,oil_list,avatar_url,city,type) {
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
                    type: this.editForm.type
                }
                addStation(params).then(res =>{
                    if(res.data.status === 0) {
                        messageWarn('添加成功');
                        this.addFormVisible = false;
                        this.getList();
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //提交新增
            addSubmit: function() {
                let  oil_list = this.addForm.oil_list.join('、');
                this.addStation(this.addForm.province_id,this.addForm.name,this.addForm.oil_gum_nums,this.addForm.address,this.addForm.province,oil_list);

            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    province_id: '',
					name: '',
                    oil_gum_nums: '',
                    address: '',
                    province: '',
                    oil_list: [],
                    avatar_url: '',
                    city: '',
                    type: ''
                };
            },
            //查询
            searchList: function() {
                this.getList(this.provice,this.station); 
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
               this.editForm.oil_list = row.oil_list.split('、');
            },

            //删除
            handleDel: function(index,row) {
                this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					deleteInitOil({}, row.id).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					});
				}).catch(() => {

				});
            },
            //编辑提交
            editSubmit() {
                let oil_list = this.editForm.oil_list.join('、');
                let param = {
                    province_id: this.editForm.province_id,
                    name: this.editForm.name,
                    oil_gum_nums: this.editForm.oil_gum_nums,
                    address: this.editForm.address,
                    province: this.editForm.province,
                    oil_list: oil_list,
                    avatar_url: this.editForm.avatar_url,
                    city: this.editForm.city,
                    type: this.editSubmit.type
                }
               editInitOil(param,this.editForm.id).then(res => {
                   if(res.status.data === 0) {
                       messageWarn('添加成功'); 
                       this.getList();
                   }else{
                       messageWarn(res.data.msg); 
                   }
               })    
            },
            selsChange: function (sels) {
                console.log(sels);
				this.sels = sels;
            },
            handleCurrentChange(val) {
				console.log(val);
            },
            batchRemove() {

            },
            //导出表格
            outExcelTable() {
                window.open('https://api.zfsyonline.com/v1/backen/station/excel', '_blank');
            }
        },
    }
</script>

<style scoped>
    
</style>