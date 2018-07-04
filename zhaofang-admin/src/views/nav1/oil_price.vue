<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="provice_id" clearable placeholder="请选择">
                        <el-option
                        v-for="item in add_provice_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                       >
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表-->
        <el-col :span="24" class="tab_header">
            <div class="tab_head_title">油品价格列表</div>
            <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
        <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
            <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
            <el-table-column 
                v-for="col in oilCols"
                :prop="col.prop" :label="col.lable" >
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
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-select v-model="addForm.province_ids" size="100" multiple  placeholder="请选择">
                        <el-option
                        v-for="item in add_provice_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.disable">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="92号" class="input_left">
                    <el-row>
				        <el-col :span="19">
                            <el-input v-model="addForm.num_92.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row>
                </el-form-item>
				<el-form-item label="95号" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.num_95.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row>    
                </el-form-item>
                <el-form-item label="98号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.num_98.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="0号" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.num_93.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
                <el-form-item label="-10号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.num_97.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="生效时间" class="input_right">
                    <el-date-picker v-model="addForm.date" type="date" placeholder="选择日期" style="width: 80%"></el-date-picker>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfloat">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-input v-model="editForm.province" size="100" multiple :disabled="true" placeholder="请选择"></el-input>
				</el-form-item>
				<el-form-item label="92号" class="input_left">
                    <el-row>
				        <el-col :span="19">
                            <el-input v-model="editForm.num_92.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row>
                </el-form-item>
				<el-form-item label="95号" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.num_95.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row>    
                </el-form-item>
                <el-form-item label="98号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.num_98.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="0号" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.num_93.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
                <el-form-item label="-10号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.num_97.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="生效时间" class="input_right">
                    <el-date-picker v-model="editForm.active_at" type="date" placeholder="选择日期" style="width: 80%"></el-date-picker>
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
    import { deleteOilPrice, editOilPrice, getOilPrice, getProvince, addOilPrice, getOilProduct } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    import {formatDate} from '../../common/js/dateFilter.js';
    export default {
        data() {
            return {
                pro_list: [],
                initList: [],
                provice_id: '',
                station: '',
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
				addForm: {
                    province_ids: [],
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_93: {"oil_id":4,"price": ''},
                    num_97: {"oil_id":5,"price": ''},
                    date: ''
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: 0,
					province: '',
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_93: {"oil_id":4,"price": ''},
                    num_97: {"oil_id":5,"price": ''},
                    active_at: ''
				},
                add_provice_list: [],
                oil_product: [],
                list: [],
                total: 0,
                page_num: 1,
                num: 15,
                tableData: [],
                oilCols: [],
                del_ids:[]
            }
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        created: function() {
            this.getList(this.provice_id,this.page_num,this.num);
            this.getProvice();
        },
        methods: {
            search: function() {
                this.getList(this.provice_id,this.page_num,this.num);
            },
            //获取列表数据
            getList(province_id,page_num,num) {
                this.listLoading = true;
                let params = {
                    province_id: province_id,
                    page_num: page_num,
                    num: num
                }
                getOilPrice(params).then(res => {
                    this.listLoading = false;
                    if(res.data.status === 0) {
                        this.total = res.data.data.list_cnt;
                        this.initList = res.data.data.oil_price_list;
                        this.oilCols = res.data.data.header;
                    }
                })
            },
            //获取省份
            getProvice: function() {
                let params = {
                    src: 'oil_price_add'
                }
                getProvince(params).then(res => {
                    if(res.data.status === 0) {
                        this.add_provice_list = res.data.data.provinces;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            selsChange: function (sels) {
               this.del_ids.length = 0;
                for(let i=0; i<sels.length; i++) {
                    this.del_ids.push(sels[i].province_id)
                }
            },
            handleCurrentChange(val) {
                this.page_num = val;
                this.getList(this.provice_id,this.page_num,this.num);
            },
            batchRemove() {
                 this.$confirm('确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let params = {
                        province_ids: JSON.stringify(this.del_ids)
                    }
					deleteOilPrice(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList(this.provice_id,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            //显示新增界面
			handleAdd: function () {
                this.addFormVisible = true;
				this.addForm = {
                    province_ids: [],
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_93: {"oil_id":4,"price": ''},
                    num_97: {"oil_id":5,"price": ''},
                    date: ''
                };
                this.getProvice();
            },
            //提交新增
            addSubmit: function() {
                if(this.addForm.date == '') {
                    messageWarn('请选择时间');
                    return false;
                }
                let active_at = Date.parse(this.addForm.date);
                let oil_price = [this.addForm.num_92,this.addForm.num_95,this.addForm.num_98,this.addForm.num_93,this.addForm.num_97];
                let params = {
                    province_ids: JSON.stringify(this.addForm.province_ids),
                    oil_price: JSON.stringify(oil_price),
                    active_at: active_at
                }
                addOilPrice(params).then(res => {
                    if(res.data.status === 0) {
                        this.addFormVisible = false;
                        messageWarn('添加成功');
                        this.getList(this.provice_id,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //编辑
            handleEdit(index, row) {
                this.editForm = {
                    id: 0,
					province: '',
					num_92: {"oil_id":1,"price": row['1']},
                    num_95: {"oil_id":2,"price": row['2']},
                    num_98: {"oil_id":3,"price": row['3']},
                    num_93: {"oil_id":4,"price": row['4']},
                    num_97: {"oil_id":5,"price": row['5']},
                    active_at: ''
				};
                this.editFormVisible = true;
                this.editForm = Object.assign(this.editForm, row);
            },
            //编辑提交
            editSubmit() {
                let active_at = Date.parse(this.editForm.active_at);
                let oil_price = [this.editForm.num_92,this.editForm.num_95,this.editForm.num_98,this.editForm.num_93,this.editForm.num_97];
                let params = {
                    oil_price: JSON.stringify(oil_price),
                    active_at: active_at
                }
                editOilPrice(params,this.editForm.province_id).then(res => {
                    if(res.data.status === 0) {
                        this.editFormVisible = false;
                        messageWarn('编辑成功');
                        this.getList(this.provice_id,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            handleDel: function(index,row) {
                 this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let arr_id = JSON.stringify([row.province_id]);
                    let params = {
                        province_ids: arr_id
                    }
					deleteOilPrice(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList(this.provice_id,this.page_num,this.num);
                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
            //导出表格
            outExcelTable() {
                window.open(this.GLOBAL.url + '/backen/oil/price?act=export&province_id='+ this.provice_id, '_blank');
            }
        }
    }
</script>

<style scoped>
    .input_left{
        width: 40%;
        float: left;
    }
    .input_right {
        margin-left: 20px;
        width: 40%;
        float: left;
    }
</style>