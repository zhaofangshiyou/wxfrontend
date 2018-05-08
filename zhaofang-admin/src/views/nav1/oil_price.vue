<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="省份">
					<el-select v-model="provice" clearable placeholder="请选择">
                        <el-option
                        v-for="(item,index) in pro_list"
                        :key="item.pro"
                        :label="item.pro"
                        :value="index">
                        </el-option>
                    </el-select>
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
            <div class="tab_head_title">油品价格列表</div>
            <el-button type="success" size="small">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small"  @click="batchRemove">批量删除</el-button>
        </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="provice" label="省份" width="150">
			</el-table-column>
			<el-table-column prop="num_92" label="92号" width="150">
			</el-table-column>
            <el-table-column prop="num_95" label="95号" width="150">
			</el-table-column>
            <el-table-column prop="num_98" label="98号" width="150">
			</el-table-column>
            <el-table-column prop="num_0" label="0号" width="150">
			</el-table-column>
            <el-table-column prop="num_10" label="-10号" width="150">
			</el-table-column>
            <el-table-column prop="time" label="生效时间" width="150">
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
                        v-for="item in add_provice_list"
                        :key="item.pinying"
                        :label="item.pro"
                        :value="item.pinying"
                        :disabled="item.disable">
                        </el-option>
                    </el-select>
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
				<el-form-item label="生效时间" class="input_right">
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
			<el-form :model="editForm" label-width="80px" ref="addForm">
				<el-form-item label="省份" prop="name">
					<el-input v-model="editForm.provice" size="100" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="92号" class="input_left">
					<el-input v-model="editForm.num_92" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="0号" class="input_right">
					<el-input v-model="editForm.num_0" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="95号" class="input_left">
					<el-input v-model="editForm.num_95" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="-10号" class="input_right">
					<el-input v-model="editForm.num_10" placeholder="" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="98号" class="input_left">
					<el-input v-model="editForm.num_98" placeholder=""  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="生效时间" class="input_right">
					<el-date-picker v-model="editForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
    import pro_oil from '../../common/js/pro_oil';
    export default {
        data() {
            return {
                pro_list: [
                    {
                        'pro': '北京',
                        'children' : [
                            {'name':'北京-加油站1',},
                            {'name':'北京-加油站2'}
                        ]
                    },
                    {
                        'pro': '安徽',
                        'children' : [
                            {'name':'安徽-加油站1'},
                            {'name':'安徽-加油站2'}
                        ]
                    },
                    {
                        'pro': '广东',
                        'children' : [
                            {'name':'广东-加油站1'},
                            {'name':'广东-加油站2'}
                        ]
                    }
                ],
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
                provice: '',
                station: '',
                listLoading: false,
                 //新增界面数据
                addFormVisible: false,
                addLoading: false,
				addForm: {
                    provice: [],
					num_92: '',
                    num_95: '',
                    num_98: '',
                    num_0: '',
                    num_10: '',
                    time: ''
                },
                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
                    id: 0,
					provice: '',
					num_92: '',
                    num_95: '',
                    num_98: '',
                    num_0: '',
                    num_10: '',
                    time: ''
				},
                add_provice_list: [
                    {pro: '北京',pinying: 'beijing',disable: false},
                    {pro: '天津',pinying: 'tianjin',disable: false},
                    {pro: '河北',pinying: 'hebei',disable: false},
                    {pro: '山西',pinying: 'shanxi1',disable: false},
                    {pro: '内蒙古',pinying: 'neimenggu',disable: false},
                    {pro: '辽宁',pinying: 'liaoning',disable: false},
                    {pro: '吉林',pinying: 'jilin',disable: false},
                    {pro: '黑龙江',pinying: 'heilongjiang',disable: false},
                    {pro: '上海',pinying: 'shanghai',disable: false},
                    {pro: '江苏',pinying: 'jiangsu',disable: false},
                    {pro: '浙江',pinying: 'zhejiang',disable: false},
                    {pro: '安徽',pinying: 'anhui',disable: false},
                    {pro: '福建',pinying: 'fujin',disable: false},
                    {pro:'江西',pinying: 'jiangxi',disable: false},
                    {pro: '山东',pinying: 'shandong',disable: false},
                    {pro: '河南',pinying: 'henan',disable: false},
                    {pro: '湖北',pinying: 'hubei',disable: false},
                    {pro: '湖南',pinying: 'hunan',disable: false},
                    {pro: '广东',pinying: 'guangdong',disable: false},
                    {pro: '广西',pinying: 'guangxi',disable: false},
                    {pro:'海南',pinying: 'hainan',disable: false},
                    {pro: '重庆',pinying: 'chongqing',disable: false},
                    {pro: '四川',pinying: 'sichuan',disable: false},
                    {pro: '贵州',pinying: 'guizhou',disable: false},
                    {pro: '云南',pinying: 'yunnan',disable: false},
                    {pro: '西藏',pinying: 'xizang',disable: false},
                    {pro: '陕西',pinying: 'shanxi2',disable: false},
                    {pro: '甘肃',pinying: 'gansu',disable: false},
                    {pro: '青海',pinying: 'qinghai',disable: false},
                    {pro: '宁夏',pinying: 'ningxia',disable: false},
                    {pro: '新疆',pinying: 'xinjiang',disable: false},
                    {pro: '台湾',pinying: 'taiwan',disable: false},
                    {pro: '香港特别行政区',pinying: 'xianggang',disable: false},
                    {pro: '澳门',pinying: 'aomen',disable: false}],
                oil_product: ['92号','95号','98号','0号','-10号'],
                list: [],
                total: 0,
                time: ''
            }
        },
        methods: {
            getList() {
                this.listLoading = true,
                this.total = this.initList.length;
                setTimeout(() => {
                    this.listLoading = false;
                },2000)
            },
            selsChange: function (sels) {
                console.log(sels);
				this.sels = sels;
            },
            handleCurrentChange(val) {
				console.log(val);
            },
            batchRemove() {

            },
            //显示新增界面
			handleAdd: function () {
                this.addFormVisible = true;
                for(let i=0; i<this.initList.length; i++) {
                    for(let j=0;j < this.add_provice_list.length; j++) {
                        if(this.initList[i].pinying == this.add_provice_list[j].pinying) {
                            this.add_provice_list[j].disable = true;
                            break;
                        }
                    }
                }
				this.addForm = {
                    provice: [],
					num_92: '',
                    num_95: '',
                    num_98: '',
                    num_0: '',
                    num_10: '',
                    time: ''
                };
            },
            //提交新增
            addSubmit: function() {
                console.log(this.addForm);
                this.addFormVisible = false;
            },
            //编辑
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                console.log(this.editForm);
            },
            //编辑提交
            editSubmit() {
                
            },
        },
        created: function() {
            this.getList();
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