<template>
<el-tabs type="border-card">
  <el-tab-pane label="汇总">
      <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">往来账列表</div>
        <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="index" label="" width="100">
        </el-table-column>
        <el-table-column prop="province" label="">
        </el-table-column>
        <el-table-column prop="name" label="中兴加油站">
        </el-table-column>
        <el-table-column prop="oil_product" label="华府加油站">
        </el-table-column>
        <el-table-column prop="oil_product" label="雨坛加油站" >
        </el-table-column>
        <el-table-column prop="oil_product" label="广阳加油站" >
        </el-table-column>
    </el-table>
		<!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
  </el-tab-pane>
  <el-tab-pane label="92号">
	<!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">往来账列表</div>
        <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="index" label="" width="100">
        </el-table-column>
        <el-table-column prop="province" label="">
        </el-table-column>
        <el-table-column prop="name" label="中兴加油站">
        </el-table-column>
        <el-table-column prop="oil_product" label="华府加油站">
        </el-table-column>
        <el-table-column prop="oil_product" label="雨坛加油站" >
        </el-table-column>
        <el-table-column prop="oil_product" label="广阳加油站" >
        </el-table-column>
    </el-table>
		<!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
  </el-tab-pane>
  <el-tab-pane label="95号">95号</el-tab-pane>
  <el-tab-pane label="98号">98号</el-tab-pane>
  <el-tab-pane label="0号">0号</el-tab-pane>
  <el-tab-pane label="-10号">-10号</el-tab-pane>
</el-tabs>
  
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>