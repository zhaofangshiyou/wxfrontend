<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="站点名称">
					<el-select v-model="oil_station" clearable placeholder="请选择">
                        <el-option
                        v-for="item in station_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.stop="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表-->
        <el-col :span="24" class="tab_header">
            <div class="tab_head_title">油站分布列表</div>
            <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small" @click="batchRemove">批量删除</el-button>
        </el-col>
        <!--表格-->
        <el-table :data="oilList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="station_name" label="站点名称" width="150">
			</el-table-column>
			<el-table-column prop="gum_num" label="油枪号" width="150">
			</el-table-column>
			<el-table-column prop="oil_name" label="油品信息" min-width="180">
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="站点名称">
					<el-select v-model="addForm.station_id" clearable size="100" placeholder="请选择" @change="stationChange($event)">
                        <el-option
                        v-for="item in station_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="枪号" class="btn_left">
					<el-select v-model="addForm.gum_num" placeholder="请选择">
                        <el-option
                        v-for="item in gunNum_option"
                        :key="item.gum_num"
                        :label="item.gum_num"
                        :value="item.gum_num"
                         :disabled="item.disable">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="油品信息" class="btn_left">
                    <el-select v-model="addForm.oil_id" placeholder="请选择">
                        <el-option
                        v-for="item in oilProduct_option"
                        :key="item.oil_id"
                        :label="item.oil_name"
                        :value="item.oil_id">
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
					<el-input v-model="editForm.station_name" size="100" placeholder="请选择"  :disabled="true">
                    </el-input>
				</el-form-item>
                <el-form-item label="枪号" class="btn_left">
					<el-input v-model="editForm.gum_num" placeholder="请选择" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="油品信息" class="btn_right">
                    <el-select v-model="editForm.oil_name" placeholder="请选择">
                        <el-option
                        v-for="item in oilProduct_option"
                        :key="item.oil_id"
                        :label="item.oil_name"
                        :value="item.oil_id">
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
    import { getOilProduct, addOilGun, getOilGunList, getStationList, getGunStatus, editGunOil, deleteOilGun } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
     export default {
         data() {
             return {
                oil_station: '',
                gunNum_option: [],
                oilProduct_option: [],
                station_list: [],
                listLoading: false,
                oilList: [],
                total: 0,
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
                    station_id: '',
					gum_num: '',
					oil_id: ''
                },
                editFormVisible: false,
                editLoading: false,
                editGunNum: 0,
                page_num: 1,
                num: 15,
                del_ids: []
             }
         },
         created: function() {
           // this.getOilProduct();
            this.getList(this.oil_station,this.page_num,this.num);
            this.getStationList();
         },
         methods: {
            //编辑
            editSubmit: function() {
                let params = {
                    oil_id: this.editForm.oil_name
                }
                editGunOil(params,this.editForm.id).then(res => {
                    if(res.data.status === 0) {
                         this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;
                        this.oil_station = '';
                        this.getList(this.oil_station,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })            
            },
            //查找
            search: function() {
                this.getList(this.oil_station,this.page_num,this.num);
            },
            //获取油站接口
            getStationList: function() {
                getStationList().then(res => {
                    if(res.data.status === 0) {
                        this.station_list = this.station_list.concat(res.data.data.station_site);
                    }else{
                        messageWarn(res.data.msg); 
                    }
                })
            },
             //获取油品信息列表
             getOilProduct: function() {
                 getOilProduct().then(res => {
                     if(res.data.status === 0) {
                        this.oilProduct_option = res.data.data;
                     }else{
                        messageWarn(res.data.msg); 
                     }
                 })
             },
             //获取列表数据
             getList: function(station_id,page_num,num) {
                 let params = {
                    station_id: station_id,
                    page_num: page_num,
                    num: num
                 }
                 getOilGunList(params).then(res=> {
                    if(res.data.status === 0) {
                       this.oilList = res.data.data.oil_gum_list; 
                       this.total = res.data.data.oil_gum_num; 
                    }else{
                        messageWarn(res.data.msg); 
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
                        this.getList();
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
             },
             //显示新增界面
            // stationChange: function(event) {
            //     let disNum = [];
            //     this.gunNum_option.length = 0;
            //     //选出该油站下已选择油品的枪号
            //     for(let k=0;k<this.oilList.length;k++) {
            //         if(this.oilList[k].value == event) {
            //             disNum.push(this.oilList[k].gun_number);
            //         }
            //     }
            //     for(let i=0;i< this.station_list.length;i++) {
            //         if(this.station_list[i].value == event) {
            //             for(let j=1;j< this.station_list[i].number+1; j++) {
            //                 console.log(j);
            //                 if(disNum.indexOf(j) > -1) {
            //                     this.gunNum_option.push({'number': j,'disabled': true});
            //                 }else{
            //                     this.gunNum_option.push({'number': j,'disabled': false});
            //                 }
            //             }
            //            // this.oilProduct_option = this.sliceString(this.station_list[i].oil_product);
            //             return;
            //         }
            //     }
            // },
            stationChange: function(event) {
                if(event) {
                    getGunStatus({},event).then(res => {
                    if(res.data.status === 0) {
                        this.gunNum_option = res.data.data.gum_list;
                        this.oilProduct_option = res.data.data.oil_list;
                    }else{
                        messageWarn(res.data.msg); 
                    }
                })
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
                this.stationChange(row.id);
                this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
            },
            handleDel(index,row) {
                this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let arr_id = JSON.stringify([row.id]);
                    let params = {
                        id: arr_id
                    }
					deleteOilGun(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                           this.getList(this.oil_station,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            selsChange(sels) {
                this.del_ids.length = 0;
                for(let i=0; i<sels.length; i++) {
                    this.del_ids.push(sels[i].id)
                }
            },
            batchRemove: function() {
                this.$confirm('确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let params = {
                        id: JSON.stringify(this.del_ids)
                    }
					deleteOilGun(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList(this.oil_station,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            handleCurrentChange(val) {
                this.page_num = val;
                this.getList(this.oil_station,this.page_num,this.num);
            },
            //导出表格
            outExcelTable() {
                window.open(this.GLOBAL.url + '/backen/oil/gum?act=export&station_id='+ this.oil_station, '_blank');
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
