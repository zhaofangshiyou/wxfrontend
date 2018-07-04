<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                    <el-input v-model="card_no" placeholder="请输入卡号"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="card_no" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="search">查询</el-button>
                </el-form-item>
			</el-form>
		</el-col>

     <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">用户列表</div>
        <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="card_no" label="id">
        </el-table-column>
        <el-table-column prop="name" label="open_id">
        </el-table-column>
        <el-table-column prop="open_id" label="卡号">
        </el-table-column>
        <el-table-column prop="consume_time" label="姓名">
        </el-table-column>
        <el-table-column prop="station_name" label="身份证">
        </el-table-column>
        <el-table-column prop="vol" label="性别">
        </el-table-column>
        <el-table-column prop="money" label="车型信息">
        </el-table-column>
        <el-table-column prop="pay_channel" label="车牌">
        </el-table-column>
        <el-table-column prop="pay_channel" label="手机号码">
        </el-table-column>
        <el-table-column prop="pay_channel" label="加油升数">
        </el-table-column>
        <el-table-column prop="pay_channel" label="公益金">
        </el-table-column>
        <el-table-column prop="pay_channel" label="积分">
        </el-table-column>
        <el-table-column prop="pay_channel" label="开卡时间">
        </el-table-column>
        <el-table-column prop="pay_channel" label="锁户时间">
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
  import { getUserConsume } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return { 
        card_no: '',
        listLoading: false,
        initList: [],
        total: 0,
        page_num: 1,
        num: 15
      }
    },
    created: function() {
      this.getList(this.card_no,this.page_num,this.num);
    },
    methods: {
      getList: function(card_no,page_num,num) {
        let params = {
          card_no: card_no,
          page_num: page_num,
          num: num
        }
        getUserConsume(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.consume_list;
            this.total = res.data.data.consume_list_cnt;
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      handleCurrentChange(val) {
        this.page_num = val;
        this.getList(this.card_no,this.page_num,this.num);
      },
      search() {
         this.getList(this.card_no,this.page_num,this.num);
      },
      //导出表格
      outExcelTable() {
        let data = '&card_no='+ this.card_no; 
        window.open(this.GLOBAL.url + '/backen/users/consume/detail?act=export'+data, '_blank');
      }
    }
  }

</script>