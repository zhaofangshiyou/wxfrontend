<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                <el-input v-model="card_num" placeholder="请选择"></el-input>
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
        <el-table-column prop="name" label="站点名称">
        </el-table-column>
        <el-table-column prop="id" label="卡号">
        </el-table-column>
        <el-table-column prop="oil_gum_nums" label="消费流水ID">
        </el-table-column>
        <el-table-column prop="oil_product" label="消费时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="油品信息">
        </el-table-column>
        <el-table-column prop="oil_product" label="升数">
        </el-table-column>
        <el-table-column prop="oil_product" label="金额">
        </el-table-column>
        <el-table-column prop="oil_product" label="发票状态">
        </el-table-column>
        <el-table-column prop="oil_product" label="开票时间">
        </el-table-column>
        <el-table-column prop="oil_product" label="操作员">
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template scope="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">确认开票</el-button>
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
         initList: [],
         listLoading: false,
         card_num: '',
         total: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
				console.log(val);
      },
      search() {
        console.log(this.card_num);
      }
    }
  }

</script>