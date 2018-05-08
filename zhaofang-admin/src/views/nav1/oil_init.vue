<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="provice" clearable placeholder="请选择" @change="selectOil($event)">
                        <el-option
                        v-for="(item,index) in pro_list"
                        :key="item.value"
                        :label="item.pro"
                        :value="index">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="站点名称">
					<el-select v-model="station" clearable placeholder="请选择">
                        <el-option
                        v-for="item in oil_station"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表-->
        <el-col :span="24" class="tab_header">
            <div class="tab_head_title">油站分布列表</div>
            <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="provice" label="省份" width="150">
			</el-table-column>
			<el-table-column prop="oil_name" label="站点名称" width="150">
			</el-table-column>
			<el-table-column prop="site_id" label="站点ID" width="150">
			</el-table-column>
			<el-table-column prop="gun_number" label="枪数" width="100">
			</el-table-column>
			<el-table-column prop="oil_product" label="油品信息" min-width="180">
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
					<el-select v-model="addForm.provice" size="100" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in add_provice_list"
                        :key="item"
                        :label="item"
                        :value="index">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="油站名称">
					<el-input v-model="addForm.oil_name" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="枪数">
					<el-input v-model="addForm.gun_number" size="100" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="油品信息">
                    <el-select v-model="addForm.oil_product" multiple placeholder="请选择" size="100">
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
					<el-select v-model="editForm.provice" size="100" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in add_provice_list"
                        :key="item"
                        :label="item"
                        :value="index">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="油站名称">
					<el-input v-model="editForm.oil_name" size="100" placeholder="请输入油站名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="枪数">
					<el-input v-model="editForm.gun_number" size="100" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="油品信息">
                    <el-select v-model="editForm.oil_product" multiple placeholder="请选择" size="100">
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
    import pro_oil from '../../common/js/pro_oil';
    export default {
        data() {
            return {
                pro_list: [
                    {
                        'pro': '北京',
                        'children' : [
                            {'name':'北京-加油站1',},
                            {'name':'北京-加油站2'}
                        ]
                    },
                    {
                        'pro': '安徽',
                        'children' : [
                            {'name':'安徽-加油站1'},
                            {'name':'安徽-加油站2'}
                        ]
                    },
                    {
                        'pro': '广东',
                        'children' : [
                            {'name':'广东-加油站1'},
                            {'name':'广东-加油站2'}
                        ]
                    }
                ],
                initList: [
                    {
                        provice: '北京',
                        oil_name: '华富油站',
                        site_id: '10010',
                        oil_product: ['15','45','82'],
                        gun_number: 10
                    },
                    {
                        provice: '北京',
                        oil_name: '华富油站',
                        site_id: '10010',
                        oil_product: ['15','45','82'],
                        gun_number: 10
                    }
                ],
                provice: '',
                station: '',
                oil_station: [],
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
				addForm: {
                    provice: '',
					oil_name: '',
                    gun_number: '',
                    oil_product: []
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: 0,
					provice: '',
					oil_name: '',
                    gun_number: '',
                    oil_product: []
				},
                add_provice_list: ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江省','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃省','青海','宁夏','新疆','台湾','香港特别行政区','澳门'],
                oil_product: ['92号','95号','98号','0号','-10号'],
                list: [],
                total: 0,
            }
        },
        methods: {
            selectOil(event) {
                this.station = '';
                this.oil_station = this.pro_list[event].children;
            },
            getList() {
                this.listLoading = true,
                this.total = this.initList.length;
                setTimeout(() => {
                    this.listLoading = false;
                },2000)
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
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    provice: '',
					oil_name: '',
                    gun_number: '',
                    oil_product: []
                };
            },
            //提交新增
            addSubmit: function() {
                console.log(this.addForm);
                this.addFormVisible = false;
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                console.log(row);
                this.editForm = Object.assign({}, row);
                console.log(this.editForm);
            },
            //编辑提交
            editSubmit() {
                
            },
        },
        created: function() {
            this.getList();
        }
    }
</script>

<style scoped>
    
</style>