<template>
<el-tabs type="border-card">
  <el-tab-pane label="不区分油品">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
        		<el-form-item label="站点名称">
					<el-select v-model="value" placeholder="请选择">
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
          <span>升数(升)：1001001000</span>
          <span style="margin-left: 50px">应收金额(元)：10000.00</span>
          <span style="margin-left: 50px">实收金额(元)：9800.00</span>
        </div>
    </el-col>
	  <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</el-tab-pane>
  <el-tab-pane label="区分油品">
	  <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
        		<el-form-item label="站点名称">
					<el-select v-model="value" placeholder="请选择">
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
          <span>升数(升)：1001001000</span>
          <span style="margin-left: 50px">应收金额(元)：10000.00</span>
          <span style="margin-left: 50px">实收金额(元)：9800.00</span>
        </div>
    </el-col>
	  <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </el-tab-pane>
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