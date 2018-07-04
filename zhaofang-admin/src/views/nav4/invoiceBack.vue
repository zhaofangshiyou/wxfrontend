<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
            <el-form-item label="卡号">
                <el-input v-model="card_no" placeholder="输入卡号" clearable="true"></el-input>
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
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="station_name" label="站点名称" width="250">
        </el-table-column>
        <el-table-column prop="card_no" label="卡号" width="150">
        </el-table-column>
        <el-table-column prop="cc_flow_id" label="消费流水ID">
        </el-table-column>
        <el-table-column prop="consume_time" label="消费时间" width="180">
        </el-table-column>
        <el-table-column prop="oil_name" label="油品信息">
        </el-table-column>
        <el-table-column prop="vol" label="升数">
        </el-table-column>
        <el-table-column prop="money" label="金额">
        </el-table-column>
        <el-table-column prop="is_invoicing_name" label="发票状态">
        </el-table-column>
        <el-table-column prop="invoice_time" label="开票时间" width="180">
        </el-table-column>
        <el-table-column prop="operator_name" label="操作员" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template scope="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">撤销开票</el-button>
            </template>
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

  import { getInvoice, operatorInvoice } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
         initList: [],
         listLoading: false,
         total: 0,
         card_no: '',
         page_num: 1,
         num: 15
      }
    },
    created: function() {
      this.getList(this.card_no,this.page_num,this.num);
    },
    methods: {
      handleEdit(index,row) {
        let that = this;
        this.$confirm('确认开票吗?', '提示', {
					type: 'warning'
				}).then(() => {
           that.operatorInvoice(row.cc_flow_id);
				}).catch(() => {

				});
      },
      operatorInvoice: function(cc_flow_id) {
        let user_id = localStorage.getItem('user_id');
        let params = {
          cc_flow_id: cc_flow_id,
          user_id: user_id,
          act: 'revoke'
        }
        operatorInvoice(params).then(res => {
          if(res.data.status === 0) {
            this.getList(this.card_no,this.page_num,this.num);
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      getList: function(card_no, page_num, num) {
        let params = {
          card_no: card_no,
          page_num: page_num,
          num: num,
          type: 0
        }
        getInvoice(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.invoice_list;
            this.total = res.data.data.invoice_total;
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
        window.open(this.GLOBAL.url + '/backen/invoice?act=export'+data, '_blank');
      }
    }
  }

</script>