<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="站点名称">
					<el-select v-model="oil_station" placeholder="请选择">
                        <el-option
                        v-for="item in station_list"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
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
            <el-button type="danger" size="small">批量删除</el-button>
        </el-col>
        <!--表格-->
        <el-table :data="oilList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="oil_name" label="站点名称" width="150">
			</el-table-column>
			<el-table-column prop="gun_number" label="油枪号" width="150">
			</el-table-column>
			<el-table-column prop="oil_product" label="油品信息" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
        <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="站点名称">
					<el-select v-model="addForm.station_id" size="100" placeholder="请选择" @change="stationChange($event)">
                        <el-option
                        v-for="(item,index) in station_list" v-if="index > 0"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="枪号" class="btn_left">
					<el-select v-model="addForm.gum_num" placeholder="请选择">
                        <el-option
                        v-for="item in gunNum_option"
                        :key="item.number"
                        :label="item.number"
                        :value="item.number"
                         :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="油品信息" class="btn_left">
                    <el-select v-model="addForm.oil_id" placeholder="请选择">
                        <el-option
                        v-for="item in oilProduct_option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfloat">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px"  ref="editForm">
				<el-form-item label="站点名称">
					<el-input v-model="editForm.oil_name" size="100" placeholder="请选择"  :disabled="true">
                    </el-input>
				</el-form-item>
                <el-form-item label="枪号" class="btn_left">
					<el-select v-model="editForm.gum_num" placeholder="请选择">
                        <el-option
                        v-for="item in editGunNum"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="油品信息" class="btn_right">
                    <el-select v-model="editForm.oil_product" placeholder="请选择">
                        <el-option
                        v-for="item in oilProduct_option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfloat">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    </section>
</template>

<script>
    import { getOilProduct, addOilGun } from '../../api/api';
     export default {
         data() {
             return {
                oil_station: '不限',
                gunNum_option: [],
                oilProduct_option: [],
                station_list: [
                    {name: '不限',value: 0},
                    {name: '中兴加油站',value: 1,number: 8},
                    {name: '雨坛加油站',value: 2,number: 6},
                    {name: '华富加油站',value: 3,number: 16},
                    {name: '广阳加油站',value: 4,number: 20}
                ],
                listLoading: false,
                oilList: [
                    {oil_name: '华富加油站',value: 3,gun_number: 1,oil_product: '0号'},
                    {oil_name: '广阳加油站',value: 4,gun_number: 1,oil_product: '-10号'},
                    {oil_name: '华富加油站',value: 3,gun_number: 6,oil_product: '95号'},
                    {oil_name: '中兴加油站',value: 1,gun_number: 1,oil_product: '92号'},
                    {oil_name: '广阳加油站',value: 4,gun_number: 4,oil_product: '95号'},
                    {oil_name: '华富加油站',value: 3,gun_number: 3,oil_product: '98号'},
                    {oil_name: '华富加油站',value: 3,gun_number: 2,oil_product: '98号'},
                    {oil_name: '中兴加油站',value: 1,gun_number: 3,oil_product: '0号'},
                ],
                total: 8,
                //新增
                addFormVisible: false,
                addLoading: false,
                addForm: {
					station_id: '',
					gum_num: '',
					oil_id: ''
				},
                //编辑
                editForm: {
                    id: '',
                    oil_name: '',
					gun_number: '',
					oil_product: ''
                },
                editFormVisible: false,
                editLoading: false,
                editGunNum: 0

             }
         },
         created: function() {
            this.getOilProduct();
         },
         methods: {
             //获取油品信息列表
             getOilProduct: function() {
                 getOilProduct().then(res => {
                     if(res.data.status === 0) {
                        this.oilProduct_option = res.data.data;
                        console.log(this.oilProduct_option);
                     }
                 })
             },
             //新增提交
             addSubmit: function() {
                let params = {
                    station_id: this.addForm.station_id,
                    oil_id: this.addForm.oil_id,
                    gum_num: this.addForm.gum_num 
                }
                addOilGun(params).then( res=> {
                    if(res.data.status === 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.addFormVisible = false;
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
             },
             //显示新增界面
            stationChange: function(event) {
                let disNum = [];
                this.gunNum_option.length = 0;
                //选出该油站下已选择油品的枪号
                for(let k=0;k<this.oilList.length;k++) {
                    if(this.oilList[k].value == event) {
                        disNum.push(this.oilList[k].gun_number);
                    }
                }
                for(let i=0;i< this.station_list.length;i++) {
                    if(this.station_list[i].value == event) {
                        for(let j=1;j< this.station_list[i].number+1; j++) {
                            console.log(j);
                            if(disNum.indexOf(j) > -1) {
                                this.gunNum_option.push({'number': j,'disabled': true});
                            }else{
                                this.gunNum_option.push({'number': j,'disabled': false});
                            }
                        }
                       // this.oilProduct_option = this.sliceString(this.station_list[i].oil_product);
                        return;
                    }
                }
            },
            //分割字符串为数组
            sliceString: function(str) {
                if(str) {
                    return str.split(",");
                }
            },
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					station_id: '',
					gum_num: '',
					oil_id: ''
				};
			},
            handleEdit(index,row) {
                this.editFormVisible = true;
                for(let i=0;i< this.station_list.length;i++) {
                    if(this.station_list[i].value == row.value) {
                        this.editGunNum = this.station_list[i].number;
                        this.oilProduct_option = this.sliceString(this.station_list[i].oil_product);
                        break;
                    }
                }
				this.editForm = Object.assign({}, row);
            },
            handleDel(index,row) {

            },
            selsChange(sels) {
                console.log(sels);
            },
            handleCurrentChange(val) {
                console.log(val);
            }
         }
     }
</script>
<style scoped>
    .btn_right{
        float: right;
    }
    .btn_left{
        float: left;
    }
</style>
>
