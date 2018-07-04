<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
            <el-select v-model="province_id"  clearable placeholder="请选择"  @change="selectSite($event)">
                <el-option
                v-for="item in provinces"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-select v-model="station_id"  clearable placeholder="请选择">
              <el-option
              v-for="item in station_site"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
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
          <span>充值金额(元)：{{recharge_total.money_total}}</span>
          <span style="margin-left: 50px">沉淀金额(元)：{{recharge_total.deposit_money_total}}</span>
          <span style="margin-left: 50px">手续费(元)：{{recharge_total.pondage_total || 0.00}}</span>
        </div>
    </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province_name" label="省份">
			</el-table-column>
			<el-table-column prop="station_name" label="站点名称">
			</el-table-column>
			<el-table-column prop="money" label="充值金额">
			</el-table-column>
      <el-table-column prop="deposit_money" label="沉淀金额">
			</el-table-column>
			<el-table-column prop="poundage" label="手续费">
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
  import { getStationList, getProvince, getRechargeAll } from '../../api/api';
	import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
        listLoading: false,
        province_id: '',
        station_id: '',
        page_num: 1,
        num: 15,
        initList: [],
        total: 0,
        recharge_total: {},
        station_site: [],
        provinces: [],
      }
    },
    created: function() {
        this.getList(this.province_id,this.station_id,this.page_num,this.num);
        this.getProvince();
    },
    methods: {
      handleCurrentChange: function(val) {
        this.page_num = val;
        this.getList(this.province_id,this.station_id,this.page_num,this.num);
      },
      search: function() {
        this.getList(this.province_id,this.station_id,this.page_num,this.num);
      },
       //获取油站
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
      getList: function(province_id,station_id,page_num,num) {
        let params = {
          province_id: province_id,
          station_id: station_id,
          page_num: page_num,
          num: num
        }

        getRechargeAll(params).then( res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.recharge_list;
            this.total = res.data.data.recharge_list_cnt;
            this.recharge_total = res.data.data.recharge_total;
          }else{
            messageWarn(res.data.msg)
          }
        })
      },
      //导出表格
      outExcelTable() {
        let data = '&province_id='+ this.province_id + '&station_id=' + this.station_id; 
        window.open(this.GLOBAL.url + '/backen/recharge?act=export'+data, '_blank');
      }
    }
  }

</script>