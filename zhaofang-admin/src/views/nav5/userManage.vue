<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                <el-input v-model="card_no" clearable placeholder="请选择"></el-input>
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
        <el-table-column prop="card_no" label="卡号"  width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="id_card" label="身份证" width="200">
        </el-table-column>
        <el-table-column prop="type" label="用户类型">
        </el-table-column>
        <el-table-column prop="deposit_money" label="当前余额" width="100">
        </el-table-column>
        <el-table-column prop="refund" label="退款状态">
        </el-table-column>
        <el-table-column prop="card_status" label="用户状态">
        </el-table-column>
        <el-table-column prop="created_time" label="开卡时间" width="180">
        </el-table-column>
        <el-table-column prop="closed_time" label="销户时间"  width="180">
        </el-table-column>
        <el-table-column prop="operated_time" label="操作时间"  width="180">
        </el-table-column>
        <el-table-column prop="initiate_by_name" label="发起人">
        </el-table-column>
        <el-table-column prop="confirm_by_name" label="确认人">
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template scope="scope">
                <el-button size="small" type="primary" :disabled="scope.row.cancel_disable" @click="deleteCard(scope.row.id)">注销账户</el-button>
                <el-button size="small" type="primary" :disabled="scope.row.initiate_refund_disable" @click="refundApply(scope.row.id)">发起退款</el-button>
                <el-button size="small" type="primary" :disabled="scope.row.confirm_refund_disable" @click="confirmApply(scope.row.id)">确认退款</el-button>
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
  import { getManageList, deleteCard, refundApply, confirmApply } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
        card_no: '',
        page_num: 1,
        num: 10,
        initList: [],
        listLoading: false,
        total: 0
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
        getManageList(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.card_list;
            this.total = res.data.data.card_list_cnt;
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
      deleteCard(id) {
        this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
          //NProgress.start();
          let arr_id = JSON.stringify([id]);
          let params = {
              ids: arr_id
          }
					deleteCard(params).then((res) => {
						this.listLoading = false;
            //NProgress.done();
            if(res.data.status === 0){
                this.$message({
                message: '注销成功',
                type: 'success'
            });
                this.getList(this.card_no,this.page_num,this.num);
            }else{
                messageWarn(res.data.msg);
            }
					});
				}).catch(() => {

				});
      },
      refundApply: function(id) {
        this.$confirm('确认申请退款?', '提示', {
					type: 'warning'
				}).then(() => {
          this.listLoading = true;
          let user_id = localStorage.getItem('user_id');
          //NProgress.start();
          let params = {
              id: id,
              initiate_by: user_id
          }
					refundApply(params).then((res) => {
						this.listLoading = false;
            //NProgress.done();
            if(res.data.status === 0){
                this.$message({
                message: '申请成功',
                type: 'success'
            });
              this.getList(this.card_no,this.page_num,this.num);
            }else{
                messageWarn(res.data.msg);
            }
					});
				}).catch(() => {

				});
      },
      confirmApply: function(id) {
        this.$confirm('确认退款?', '提示', {
					type: 'warning'
				}).then(() => {
          this.listLoading = true;
          let user_id = localStorage.getItem('user_id');
          //NProgress.start();
          let params = {
              id: id,
              confirm_by: user_id
          }
					confirmApply(params).then((res) => {
						this.listLoading = false;
            //NProgress.done();
            if(res.data.status === 0){
                this.$message({
                message: '申请成功',
                type: 'success'
            });
           // this.getList(this.provice_id,this.station_id,this.begin_time,this.end_time,this.page_num,this.num);

            }else{
                messageWarn(res.data.msg);
            }
					});
				}).catch(() => {

				});
      },
      //导出表格
      outExcelTable() {
        let data = '&card_no='+ this.card_no; 
        window.open(this.GLOBAL.url + '/backen/users?act=export'+data, '_blank');
      }
    }
  }

</script>