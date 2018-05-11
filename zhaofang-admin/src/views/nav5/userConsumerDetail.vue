<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                <el-input v-model="card_number" placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  v-on:click="getUsers">查询</el-button>
            </el-form-item>
			</el-form>
		</el-col>

     <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">消费列表</div>
        <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="province" label="卡号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="id" label="微信ID/名称">
        </el-table-column>
        <el-table-column prop="oil_gum_nums" label="消费时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="消费站点">
        </el-table-column>
        <el-table-column prop="oil_product" label="加油生数">
        </el-table-column>
        <el-table-column prop="oil_product" label="消费金额">
        </el-table-column>
        <el-table-column prop="oil_product" label="支付方式">
        </el-table-column>
    </el-table>
    
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>

  export default {
    data() {
      return { 
        card_number: '',
        listLoading: false,
        initList: [],
        total: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
				console.log(val);
      },
      getUsers() {
        console.log(this.card_number);
      }
    }
  }

</script>