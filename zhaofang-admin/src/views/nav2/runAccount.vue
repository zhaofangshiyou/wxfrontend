<template>
<el-tabs type="border-card"  @tab-click="handleClick" value="0">
  <el-tab-pane v-for="item in oil_list" :label="item.name" :name="item.id">
      <!--列表-->
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="时间">
                    <el-date-picker
                        v-model="time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
			</el-form>
		</el-col>

    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">往来账列表</div>
        <el-button type="success" size="small" @click="outExcelTable(item.id)">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label">
        </el-table-column>
    </el-table>
  </el-tab-pane>

</el-tabs>
  
</template>
<script>
    import { getRunAcounts, getOilProduct} from '../../api/api';
    import { messageWarn } from '../../common/js/commonMethod';
    export default {
        data() {
        return {
            activeName2: 'first',
            listLoading: false,
            initList: [],
            cols: [],
            time: [],
            oil_list: [{"id": '',"name": "汇总"}],
            begin_time: '',
            end_time: '',
            oil_id: '',
        };
        },
        created: function() {
            this.getOil();
            this.getList(this.oil_id,this.begin_time,this.end_time);
        },
        methods: {
        search: function() {
            this.begin_time = "";
            this.end_time = "";
            if(this.time[0]) {
            let begin_date = new Date(this.time[0]);
            this.begin_time = begin_date.getFullYear() + '-' + (begin_date.getMonth() + 1) + '-' + begin_date.getDate() + ' ' + begin_date.getHours() + ':' + begin_date.getMinutes() + ':' + begin_date.getSeconds(); 
            }
            if(this.time[1]) {
            let end_date = new Date(this.time[1]);
            this.end_time = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate() + ' ' + end_date.getHours() + ':' + end_date.getMinutes() + ':' + end_date.getSeconds(); 
            }
            this.getList(this.oil_id,this.begin_time,this.end_time);
        },
        getOil: function() {
            getOilProduct().then(res => {
                if(res.data.status === 0) {
                    for(let i=0; i<res.data.data.length; i++) {
                        res.data.data[i].id = res.data.data[i].id + '';
                    }
                    this.oil_list = this.oil_list.concat(res.data.data);
                }else{
                    messageWarn(res.data.msg);
                }
            })
        },
        getList: function(oil_id,begin_time,end_time) {
            let params = {
                begin_time: begin_time,
                end_time: end_time,
                oil_id: oil_id
            }
            getRunAcounts(params).then( res=> {
                if(res.data.status === 0) {
                    this.initList = res.data.data.accounts_list;
                    this.cols = res.data.data.header;
                }else {
                    messageWarn(res.data.msg);
                }
            })
        },

        handleCurrentChange(val) {
            
        },
        handleClick(tab) {
            this.oil_id = tab.name;
            this.getList(this.oil_id,this.begin_time,this.end_time);
        },
        //导出表格
      outExcelTable() {
        let data = '&oil_id='+ this.oil_id + '&begin_time='+ this.begin_time + '&end_time=' + this.end_time; 
        window.open(this.GLOBAL.url + '/backen/accounts?act=export'+data, '_blank');
      }


        }
    };
    </script>