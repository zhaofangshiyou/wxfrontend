<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="province_id"  clearable placeholder="请选择省份" @change="selectSite($event)">
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              >
            </el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="站点名称">
					<el-select v-model="station_id"  clearable placeholder="请选择站点名称">
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
        </el-form-item><br>
        <el-form-item label="油品">
					<el-select v-model="oil_id" clearable placeholder="请选择油品信息">
            <el-option
              v-for="item in oil_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="支付方式">
					<el-select v-model="pay_channel" clearable placeholder="请选择支付方式">
            <el-option
              v-for="item in pay_way"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="加油升数">
					<el-input v-model="vol_min" placeholder="" type="number"></el-input>
				</el-form-item>
        <el-form-item label="-">
          <el-input v-model="vol_max" placeholder="" type="number"></el-input>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

     <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">消费列表</div>
        <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">总计</div>
        <div style="float: right">
          <span>升数(升)：{{consume_total.vol_total}}</span>
          <span style="margin-left: 50px">应收金额(元)：{{consume_total.money_total}}</span>
          <span style="margin-left: 50px">实收金额(元)：{{consume_total.actual_money_total}}</span>
          <span style="margin-left: 50px">手续费(元)：{{consume_total.poundage_total}}</span>
          <span style="margin-left: 50px">实际到账(元)：{{consume_total.wallet_recv_total}}</span>
        </div>
    </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province_name" label="省份">
			</el-table-column>
			<el-table-column prop="station_name" label="站点名称" width="180">
			</el-table-column>
      <el-table-column prop="trade_no" label="流水号">
			</el-table-column>
			<el-table-column prop="card_no" label="卡号" width="180">
			</el-table-column>
			<el-table-column prop="consume_time" label="消费时间" width="180">
			</el-table-column>
			<el-table-column prop="gum_num" label="油枪号">
			</el-table-column>
      <el-table-column prop="oil_name" label="油品信息">
			</el-table-column>
			<el-table-column prop="vol" label="升数" >
			</el-table-column>
      <el-table-column prop="money" label="应收金额" >
			</el-table-column>
      <el-table-column prop="discount" label="优惠金额">
			</el-table-column>
      <el-table-column prop="poundage" label="手续费" >
			</el-table-column>
      <el-table-column prop="wallet_recv" label="实际到账">
			</el-table-column>
      <el-table-column prop="actual_money" label="实收金额">
			</el-table-column>
      <el-table-column prop="pay_channel" label="支付方式" >
			</el-table-column>
		</el-table>
    
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
  import { getOilProduct, getStationList,getProvince, getConsumeDetail } from '../../api/api';
  export default {
    data() {
      return {
        listLoading: false,
        min_oil: 0,
        initList: [],
        page_num: 1,
        num: 15,
        total: 0,
        provinces: [],
        province_id: '',
        station_id: '',
        oil_id: '',
        vol_min: 0,
        vol_max: '',
        pay_channel: '',
        begin_time: '',
        end_time: '',
        time: [],
        station_site:[],
        oil_list: [],
        consume_total: {},
        pay_way: [{'type':0,'name': '个人卡'},{'type': 1,'name': '单位卡'},{'type': 3, 'name': '微信支付'}],
       // args:[page_num,num,province_id,station_id,oil_id,begin_time,end_time,vol_min,vol_max,pay_channel]
      }
    },
    created: function() {
        this.getProvince();
        this.getList(this.page_num,this.num,this.province_id,this.station_id,this.oil_id,this.begin_time,this.end_time,this.vol_min,this.vol_max,this.pay_channel);
        this.getOil();
    },
    methods: {
      search:function() {
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
        this.getList(this.page_num,this.num,this.province_id,this.station_id,this.oil_id,this.begin_time,this.end_time,this.vol_min,this.vol_max,this.pay_channel)
      },
      handleCurrentChange: function(val) {
        this.page_num = val;
        this.getList(this.page_num,this.num,this.province_id,this.station_id,this.oil_id,this.begin_time,this.end_time,this.vol_min,this.vol_max,this.pay_channel);
      },
      selsChange: function(val) {},
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

      //获取油品
      getOil: function() {
        getOilProduct().then(res => {
          if(res.data.status === 0) {
            this.oil_list = res.data.data;
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
      getList: function(page_num,num,province_id,station_id,oil_id,begin_time,end_time,vol_min,vol_max,pay_channel){
        let params = {
          province_id: province_id,
          station_id: station_id,
          oil_id: oil_id,
          begin_time: begin_time,
          end_time: end_time,
          vol_min: vol_min,
          vol_max: vol_max,
          pay_channel: pay_channel,
          page_num: page_num,
          num: num
        };
        getConsumeDetail(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.consume_list;
            this.total = res.data.data.consume_list_cnt;
            this.consume_total = res.data.data.consume_total;
          }
        })
      },

      //导出表格
      outExcelTable() {
        let data = '&province_id='+ this.province_id + '&station_id=' + this.station_id + '&oil_id=' + this.oil_id + '&begin_time='+ this.begin_time + '&end_time=' + this.end_time + '&vol_min=' + this.vol_min + '&vol_max=' + this.vol_max + '&pay_channel=' + this.pay_channel; 
        window.open(this.GLOBAL.url + '/backen/consume/detail?act=export'+data, '_blank');
      }
    }
  }

</script>


