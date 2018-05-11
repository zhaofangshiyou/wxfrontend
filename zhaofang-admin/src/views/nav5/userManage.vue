<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                <el-input v-model="card_number" placeholder="请选择"></el-input>
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
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="id" label="卡号">
        </el-table-column>
        <el-table-column prop="province" label="姓名">
        </el-table-column>
        <el-table-column prop="name" label="身份证">
        </el-table-column>
        <el-table-column prop="oil_gum_nums" label="用户类型">
        </el-table-column>
        <el-table-column prop="oil_product" label="当前余额">
        </el-table-column>
        <el-table-column prop="oil_product" label="退款状态">
        </el-table-column>
        <el-table-column prop="oil_product" label="用户状态">
        </el-table-column>
        <el-table-column prop="oil_product" label="开卡时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="销户时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="操作时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="发起人">
        </el-table-column>
        <el-table-column prop="oil_product" label="确认人">
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template scope="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">注销账户</el-button>
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">确认退款</el-button>
            </template>
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
        initList: [],
        listLoading: false,
        total: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val);
      },
      search() {
        console.log(this.card_number);
      }
    }
  }

</script>