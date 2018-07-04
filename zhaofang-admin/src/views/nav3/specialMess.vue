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
				<el-form-item label="站点名称">
					<el-select v-model="station_id" clearable placeholder="请选择">
                        <el-option
                        v-for="item in station_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                       >
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
						v-model="time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
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
            <div class="tab_head_title">优惠信息列表</div>
            <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
        <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
            <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
            <el-table-column prop="province" label="省份" >
            </el-table-column>
            <el-table-column prop="station_name" label="油站名称" width="200">
            </el-table-column>
            <el-table-column prop="discount_days" label="有效天数" >
            </el-table-column>
            <el-table-column prop="discount_begin_time" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="discount_end_time" label="结束时间" width="180">
            </el-table-column>
            <el-table-column prop="amount_start" label="阈值" width="120">
            </el-table-column>
            <el-table-column prop="oil_92" label="92号" >
            </el-table-column>
            <el-table-column prop="oil_95" label="95号" >
            </el-table-column>
            <el-table-column prop="oil_98" label="98号" >
            </el-table-column>
            <el-table-column prop="oil_0" label="0号" >
            </el-table-column>
            <el-table-column prop="oil_10" label="-10号" >
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
					<el-select v-model="addForm.province_id" size="100" placeholder="请选择" @change="selectSite($event)">
                        <el-option
                        v-for="item in add_provice_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="油站名称" prop="name">
					<el-select v-model="addForm.station_ids" size="100" multiple  placeholder="请选择">
                        <el-option
                        v-for="item in station_site"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
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
					        <el-input v-model="addForm.num_0.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
                <el-form-item label="-10号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.num_10.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="阈值" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.total_money" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="优惠天数" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="addForm.date" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            天
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="有效日期" class="input_right">
					<el-row>
				        <el-col :span="24">
							 <el-date-picker
								v-model="addForm.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期" >
								</el-date-picker>
						</el-col>
                    </el-row> 
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
					<el-input v-model="editForm.province_id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="油站名称" prop="name">
					<el-input v-model="editForm.station_id" :disabled="true" ></el-input>
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
					        <el-input v-model="editForm.num_0.price" type="number" placeholder="" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
                <el-form-item label="-10号" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.num_10.price" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元/升
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="阈值" class="input_right">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.total_money" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            元
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="优惠天数" class="input_left">
                    <el-row>
				        <el-col :span="19">
					        <el-input v-model="editForm.date" type="number" placeholder=""  auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="5">
                            天
                        </el-col>
                    </el-row> 
                </el-form-item>
				<el-form-item label="有效日期" class="input_right">
					<el-row>
				        <el-col :span="24">
							 <el-date-picker
								v-model="editForm.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期" >
								</el-date-picker>
						</el-col>
                    </el-row> 
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
    import {editDiscount,deleteDiscount, getDiscount, getStationList,  deleteOilPrice, discountAdd,  getProvince, addOilPrice, getOilProduct } from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    import {formatDate} from '../../common/js/dateFilter.js';
    export default {
        data() {
            return {
				time: [],
                pro_list: [],
                initList: [],
                station_site: [],
                station_list: [],
                provice_id: '',
                station_id: '',
                station: '',
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
				addForm: {
                    province_id: '',
                    station_ids: [],
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_0: {"oil_id":4,"price": ''},
                    num_10: {"oil_id":5,"price": ''},
                    date: '',
                    total_money: '',
                    time: []
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: 0,
					province_id: '',
                    station_id: '',
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_0: {"oil_id":4,"price": ''},
                    num_10: {"oil_id":5,"price": ''},
                    date: '',
                    total_money: '',
                    time: []
				},
                add_provice_list: [],
                oil_product: [],
                list: [],
                total: 0,
                page_num: 1,
                num: 15,
                tableData: [],
                oilCols: [],
                del_ids:[],
                begin_time: '',
                end_time: ''
            }
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        created: function() {
            this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
            this.getProvice();
            this.getStation();
        },
        methods: {
            //新增获取油站
            selectSite: function(event) {
                this.station_site.length = 0;
                this.addForm.station_ids.length = 0;
                let params = {
                province_id: event
                }
                getStationList(params).then(res => {
                if(res.data.status === 0) {
                    this.station_site = res.data.data.station_site;
                }
                })
            },
            //获取油站
            getStation: function() {
                getStationList().then(res => {
                    if(res.data.status === 0) {
                        this.station_list = res.data.data.station_site;
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            search: function() {
                this.begin_time = "";
                this.end_time = "";
                if(this.time[0]) {
                    let begin_date = new Date(this.time[0]);
                    this.begin_time = begin_date.getFullYear() + '-' + (begin_date.getMonth() + 1) + '-' + begin_date.getDate() + ' ' + begin_date.getHours() + ':' + begin_date.getMinutes() + ':' + begin_date.getSeconds(); 
                }
                if(this.time[1]) {
                    let end_date = new Date(this.time[1]);
                    this.end_time = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate() + ' ' + end_date.getHours() + ':' + end_date.getMinutes() + ':' + end_date.getSeconds(); 
                }
            this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
            },
            //获取列表数据
            getList(province_id,station_id,begin_time,end_time,page_num,num) {
                this.listLoading = true;
                let params = {
                    province_id: province_id,
                    station_id: station_id,
                    begin_time: begin_time,
                    end_time: end_time,
                    page_num: page_num,
                    num: num
                }
                getDiscount(params).then(res => {
                    this.listLoading = false;
                    if(res.data.status === 0) {
                        this.total = res.data.data.discount_rule_cnt;
                        this.initList = res.data.data.discount_rule_list;
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
                    this.del_ids.push(sels[i].id)
                }
            },
            handleCurrentChange(val) {
                this.page_num = val;
                 this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
            },
            batchRemove() {
                 this.$confirm('确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
                    //NProgress.start();
                    let params = {
                        ids: JSON.stringify(this.del_ids)
                    }
					deleteDiscount(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
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
                    province_id: '',
                    station_ids: [],
					num_92: {"oil_id":1,"price": ''},
                    num_95: {"oil_id":2,"price": ''},
                    num_98: {"oil_id":3,"price": ''},
                    num_0: {"oil_id":4,"price": ''},
                    num_10: {"oil_id":5,"price": ''},
                    date: '',
                    total_money: '',
                    time: []
                };
                
            },
            //提交新增
            addSubmit: function() {
                if(this.addForm.date == '') {
                    messageWarn('请选择时间');
                    return false;
                }
                    let temp_begin_time = "";
                    let temp_end_time = "";
                    if(this.addForm.time[0]) {
                        let begin_date = new Date(this.addForm.time[0]);
                        temp_begin_time = begin_date.getFullYear() + '-' + (begin_date.getMonth() + 1) + '-' + begin_date.getDate() + ' ' + begin_date.getHours() + ':' + begin_date.getMinutes() + ':' + begin_date.getSeconds(); 
                    }
                    if(this.addForm.time[1]) {
                        let end_date = new Date(this.addForm.time[1]);
                        temp_end_time = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate() + ' ' + end_date.getHours() + ':' + end_date.getMinutes() + ':' + end_date.getSeconds();             
                }
                let oil_price = [this.addForm.num_92,this.addForm.num_95,this.addForm.num_98,this.addForm.num_0,this.addForm.num_10];
                let params = {
                    province_id: this.addForm.province_id,
                    station_ids: JSON.stringify(this.addForm.station_ids),
                    begin_time: temp_begin_time,
                    end_time: temp_end_time,
                    discount_type: '1',
                    discount_days: this.addForm.date,
                    oil_price: JSON.stringify(oil_price),
                    amount_start: this.addForm.total_money
                };
                discountAdd(params).then(res => {
                    if(res.data.status === 0) {
                        this.addFormVisible = false;
                        messageWarn('添加成功');
                         this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);

//this.getList(this.provice_id,this.page_num,this.num);
                    }else{
                        messageWarn(res.data.msg);
                    }
                })
            },
            //编辑
            handleEdit(index, row) {
                this.editForm = {
                    id: row.id,
					province_id: row.province_id,
                    station_id: row.station_id,
					num_92: {"oil_id":1,"price": row.oil_92},
                    num_95: {"oil_id":2,"price": row.oil_95},
                    num_98: {"oil_id":3,"price": row.oil_98},
                    num_0: {"oil_id":4,"price": row.oil_0},
                    num_10: {"oil_id":5,"price": row.oil_10},
                    date: row.discount_days,
                    total_money: row.amount_start,
                    time: [row.discount_begin_time,row.discount_end_time]
				};
                this.editFormVisible = true;
                // this.editForm = Object.assign(this.editForm, row);
                console.log(this.editForm);
            },
            //编辑提交
            editSubmit() {
                 if(this.editForm.date == '') {
                    messageWarn('请选择时间');
                    return false;
                }
                    let temp_begin_time = "";
                    let temp_end_time = "";
                    if(this.editForm.time[0]) {
                        let begin_date = new Date(this.editForm.time[0]);
                        temp_begin_time = begin_date.getFullYear() + '-' + (begin_date.getMonth() + 1) + '-' + begin_date.getDate() + ' ' + begin_date.getHours() + ':' + begin_date.getMinutes() + ':' + begin_date.getSeconds(); 
                    }
                    if(this.editForm.time[1]) {
                        let end_date = new Date(this.editForm.time[1]);
                        temp_end_time = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate() + ' ' + end_date.getHours() + ':' + end_date.getMinutes() + ':' + end_date.getSeconds();             
                }
                let oil_price = [this.editForm.num_92,this.editForm.num_95,this.editForm.num_98,this.editForm.num_0,this.editForm.num_10];
                let params = {
                    id: this.editForm.id,
                    station_id: this.editForm.station_id,
                    begin_time: temp_begin_time,
                    end_time: temp_end_time,
                    discount_type: '1',
                    discount_days: this.editForm.date,
                    oil_price: JSON.stringify(oil_price),
                    amount_start: this.editForm.total_money
                };
                editDiscount(params,this.editForm.id).then(res => {
                    if(res.data.status === 0) {
                        this.editFormVisible = false;
                        messageWarn('编辑成功');
                        this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
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
                    let arr_id = JSON.stringify([row.id]);
                    let params = {
                        ids: arr_id
                    }
					deleteDiscount(params).then((res) => {
						this.listLoading = false;
                        //NProgress.done();
                            if(res.data.status === 0){
                                this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);

                        }else{
                            messageWarn(res.data.msg);
                        }
					});
				}).catch(() => {

				});
            },
                //导出表格
            outExcelTable() {
                console.log(this.begin_time);
                let data = '&province_id='+ this.provice_id + '&station_id=' + this.station_id + '&begin_time='+ this.begin_time + '&end_time=' + this.end_time; 
                window.open(this.GLOBAL.url + '/backen/discount?act=export'+data, '_blank');
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