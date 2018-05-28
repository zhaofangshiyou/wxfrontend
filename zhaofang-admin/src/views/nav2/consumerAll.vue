<template>
<el-tabs type="border-card">
  <el-tab-pane label="不区分油品">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select clearable v-model="province_id" placeholder="请选择" @change="selectSite($event)">
						<el-option
						v-for="item in provinces"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
        		<el-form-item label="站点名称">
					<el-select clearable v-model="station_id" placeholder="请选择">
						<el-option
						v-for="item in station_site"
						:key="item.id"
						:label="item.name"
						:value="item.id">
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
			</el-form>
		</el-col>

		 <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">消费列表</div>
        <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">总计</div>
        <div style="float: right">
          <span>升数(升)：{{comsumer_total.vol_total}}</span>
          <span style="margin-left: 50px">应收金额(元)：{{comsumer_total.money_total}}</span>
          <span style="margin-left: 50px">实收金额(元)：{{comsumer_total.actual_money_total}}</span>
        </div>
    </el-col>
	  <el-table :data="notDifferOilList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province_name" label="省份">
			</el-table-column>
			<el-table-column prop="station_name" label="站点名称">
			</el-table-column>
			<el-table-column prop="vol" label="升数" >
			</el-table-column>
			<el-table-column prop="money" label="应收金额" >
			</el-table-column>
			<el-table-column prop="actual_money" label="实收金额">
			</el-table-column>
			<el-table-column prop="currrent_time" label="汇总时间" >
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</el-tab-pane>
  <el-tab-pane label="区分油品">
	  <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select clearable v-model="value" placeholder="请选择">
						<el-option
						v-for="item in provinces"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
        		<el-form-item label="站点名称">
					<el-select clearable v-model="value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间">
				<el-date-picker
					v-model="value4"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		 <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">消费列表</div>
        <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">总计</div>
        <div style="float: right">
          <span>升数(升)：{{comsumer_total.vol_total}}</span>
          <span style="margin-left: 50px">应收金额(元)：{{comsumer_total.money_total}}</span>
          <span style="margin-left: 50px">实收金额(元)：{{comsumer_total.actual_money_total}}</span>
        </div>
    </el-col>
	  <el-table :data="initList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province" label="省份">
			</el-table-column>
			<el-table-column prop="name" label="站点名称">
			</el-table-column>
			<el-table-column prop="oil_product" label="油品信息">
			</el-table-column>
			<el-table-column prop="oil_product" label="升数" >
			</el-table-column>
			<el-table-column prop="oil_product" label="应收金额" >
			</el-table-column>
			<el-table-column prop="oil_product" label="实收金额">
			</el-table-column>
			<el-table-column prop="oil_product" label="汇总时间" >
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </el-tab-pane>
</el-tabs>
  
</template>
<script>
	import { getProvince,getStationList, getConsumeAll } from '../../api/api';
	import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
				time: [],
				listLoading: false,
				type: 1,
				province_id: '',
				station_id: '',
				differOilList: [],
				total: 0,
				notDifferOilList: [],
				page_num: 1,
				differPage: 1,
				differTotal: 0,
				num: 15,
				comsumer_total: {},
				comsumer_differ_total: {},
				provinces: [],
				station_site: [],
				begin_time: '',
				end_time: '',
				value4: '',
				value: '',
				options: [],
				initList: []
      };
		},
		created: function() {
			this.getNotDifferOil(this.province_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);
			this.getProvince();
		},
    methods: {
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
				this.getNotDifferOil(this.province_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num)

			},
			handleCurrentChange: function(val) {
				this.page_num = val;
        this.getNotDifferOil(this.province_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num)
			},
			selectSite: function(event) {
        this.station_site.length = 0;
        this.station_id = '';
        let params = {
          province_id: event
        }
        getStationList(params).then(res => {
          if(res.data.status === 0) {
            this.station_site = res.data.data.station_site;
          }
        })
      },
			//获取省份
      getProvince: function() {
        getProvince().then(res => {
          if(res.data.status === 0) {
            this.provinces = res.data.data.provinces;
          }
        })
      },
			getNotDifferOil: function(province_id,station_id,begin_time,end_time,page_num,num) {
				let params = {
					type: 1,
					province_id: province_id,
					station_id: station_id,
					begin_time: begin_time,
					end_time: end_time,
					page_num: page_num,
					num: num
				}
				getConsumeAll(params).then(res => {
					if(res.data.status === 0) {
						this.notDifferOilList = res.data.data.consume_list;
						this.total = res.data.data.consume_list_cnt;
						this.comsumer_total = res.data.data.consume_total;
					}else{
						messageWarn(res.data.msg);
					}
				})
			}
    }
  };
</script>