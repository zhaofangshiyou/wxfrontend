<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="provice" placeholder="请选择">
						<el-option
						v-for="item in 6"
						:key="item"
						:label="item"
						:value="item">
						</el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="站点名称">
					<el-select v-model="station_name" placeholder="请选择">
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item">
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
		<el-form-item>
			<el-button type="primary" @click="handleAdd">新增</el-button>
		</el-form-item>
		</el-form>
		</el-col>

		<!--列表-->
		<el-col :span="24" class="tab_header">
			<div class="tab_head_title">优惠信息列表</div>
			<el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
		</el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="province" label="省份">
			</el-table-column>
			<el-table-column prop="name" label="站点名称">
			</el-table-column>
			<el-table-column prop="id" label="有效天数">
			</el-table-column>
			<el-table-column prop="oil_gum_nums" label="开始时间">
			</el-table-column>
			<el-table-column prop="oil_product" label="结束时间">
			</el-table-column>
      		<el-table-column prop="oil_product" label="阈值">
			</el-table-column>
			<el-table-column prop="oil_product" label="92号" >
			</el-table-column>
      		<el-table-column prop="oil_product" label="95号" >
			</el-table-column>
      		<el-table-column prop="oil_product" label="98号">
			</el-table-column>
      		<el-table-column prop="oil_product" label="0号" >
			</el-table-column>
     		 <el-table-column prop="oil_product" label="-10号">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
    
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-select v-model="addForm.provice" size="100" multiple  placeholder="请选择">
                        <el-option
                        v-for="item in 9"
                        :key="item"
                        :label="item"
                        :value="item"
                        :disabled="false">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="省份" prop="name" class="input_left">
					<el-select v-model="addForm.provice" placeholder="请选择">
						<el-option
						v-for="item in 9"
						:key="item"
						:label="item"
						:value="item"
						:disabled="false">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="有效天数" class="input_right">
					<el-input v-model="addForm.num_0" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="92号" class="input_left">
					<el-input v-model="addForm.num_92" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="0号" class="input_right">
					<el-input v-model="addForm.num_0" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="95号" class="input_left">
					<el-input v-model="addForm.num_95" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="-10号" class="input_right">
					<el-input v-model="addForm.num_10" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="98号" class="input_left">
					<el-input v-model="addForm.num_98" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="阈值" class="input_right">
					<el-input v-model="addForm.num_98" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="生效时间" class="input_left">
					<el-date-picker v-model="addForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfloat">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		 <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-select v-model="addForm.provice" size="100" multiple  placeholder="请选择">
                        <el-option
                        v-for="item in 9"
                        :key="item"
                        :label="item"
                        :value="item"
                        :disabled="false">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="省份" prop="name" class="input_left">
					<el-select v-model="addForm.provice" placeholder="请选择">
						<el-option
						v-for="item in 9"
						:key="item"
						:label="item"
						:value="item"
						:disabled="false">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="有效天数" class="input_right">
					<el-input v-model="addForm.num_0" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="92号" class="input_left">
					<el-input v-model="addForm.num_92" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="0号" class="input_right">
					<el-input v-model="addForm.num_0" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="95号" class="input_left">
					<el-input v-model="addForm.num_95" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="-10号" class="input_right">
					<el-input v-model="addForm.num_10" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="98号" class="input_left">
					<el-input v-model="addForm.num_98" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="阈值" class="input_right">
					<el-input v-model="addForm.num_98" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="生效时间" class="input_left">
					<el-date-picker v-model="addForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfloat">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
  </section>
</template>

<script>

  export default {
    data() {
      return {
		provice: '',
		station_name: '',
		listLoading: false,
		total: 10,
		addFormVisible: false,
		addLoading: false,
		addForm: {
			provice: '',
			oil_name: '',
			gun_number: '',
			address: '',
			oil_product: []
		},
		editFormVisible: false,
		editLoading: false,
        value4:  [new Date(), new Date()],
        initList: [],
      }
	},
	methods: {
		handleAdd() {
			this.addFormVisible = true;
			this.addForm = {
				provice: '',
				oil_name: '',
				gun_number: '',
				oil_product: []
			};
		},
		handleEdit(index, row) {
			this.editFormVisible = true;
			console.log(row);
			this.editForm = Object.assign({}, row);
			console.log(this.editForm);
		},
		handleCurrentChange() {}
	}
  }

</script>

<style scoped>
    .input_left{
        width: 40%;
        float: left;
    }
    .input_right {
        width: 40%;
        float: right;
    }
</style>