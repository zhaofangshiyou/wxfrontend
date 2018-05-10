<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                <el-input v-model="value" placeholder="请选择"></el-input>
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
    <el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="province" label="省份">
        </el-table-column>
        <el-table-column prop="name" label="站点名称">
        </el-table-column>
        <el-table-column prop="id" label="卡号">
        </el-table-column>
        <el-table-column prop="oil_gum_nums" label="充值金额">
        </el-table-column>
        <el-table-column prop="oil_product" label="手续费">
        </el-table-column>
        <el-table-column prop="oil_product" label="充值时间">
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
         options: [{
          value: '选项1',
          label: '不限'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value4:  [new Date(), new Date()],
         initList: [
                    {
                        provice: '北京',
                        pinying: 'beijing',
                        num_92: '7.8元/升',
                        num_95: '7.9元/升',
                        num_98: '7.6元/升',
                        num_0: '7.3元/升',
                        num_10: '7.7元/升',
                        time: '2018-02-15'
                    },
                   {
                        provice: '广东',
                         pinying: 'beijing2',
                        num_92: '7.8元/升',
                        num_95: '7.9元/升',
                        num_98: '7.6元/升',
                        num_0: '7.3元/升',
                        num_10: '7.7元/升',
                        time: '2018-02-15'
                    },
                    {
                        provice: '安徽',
                         pinying: 'beijing3',
                        num_92: '7.8元/升',
                        num_95: '7.9元/升',
                        num_98: '7.6元/升',
                        num_0: '7.3元/升',
                        num_10: '7.7元/升',
                        time: '2018-02-15'
                    },
                    {
                        provice: '广西',
                         pinying: 'beijing4',
                        num_92: '7.8元/升',
                        num_95: '7.9元/升',
                        num_98: '7.6元/升',
                        num_0: '7.3元/升',
                        num_10: '7.7元/升',
                        time: '2018-02-15'
                    }
                ],
      }
    }
  }

</script>