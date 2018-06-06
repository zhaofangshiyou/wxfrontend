<template>
  <div class="components-container">
    <el-form ref="form"  label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="title"></el-input>
  </el-form-item>
    </el-form>
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
     <button @click="getUEContent()" class="submit">提交</button>
  </div>
</template>
<style>
  .components-container {
    margin-top: 30px;
  }
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .submit{
    margin-top: 20px;
    text-align: center;
    width: 100px;
    height: 40px;
    background: #20a0ff;
    color: #fff;
    border: 1px solid #20a0ff;
    border-radius: 4px;
  }
</style>
<script>
  import { discountDocAdd, discountDocEdit, updateDoc } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  import UE from '../../components/ue.vue';
  export default {
    components: {UE},
    data() {
      return {
        title: '',
        defaultMsg: '',
        content:'',
        content: '',
        id: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    created: function() {
      this.editorContent();
    },
    methods: {
      editorContent: function() {
        let that = this;
        discountDocEdit().then(res => {
          if(res.data.status === 0) {
            if(res.data.data.discount_doc_list.length > 0) {
              that.defaultMsg = res.data.data.discount_doc_list[0].content;
              that.title = res.data.data.discount_doc_list[0].title;
              this.id = res.data.data.discount_doc_list[0].id;
              that.$refs.ue.initContent(that.defaultMsg);
            }
          }else{
            messageWarn(res.data.msg);
          }
        });
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        let params = {
          title: this.title,
          content: content
        }
        if(this.id) {
          updateDoc(params,this.id).then(res => {
              if(res.data.status === 0) {
              this.$message({
                  message: '修改成功',
                  type: 'success'
              });
               this.editorContent();
            }else{
              messageWarn(res.data.msg);
            }
          })
        }else{
          discountDocAdd(params).then(res => {
            if(res.data.status === 0) {
              this.$message({
                  message: '添加成功',
                  type: 'success'
              });
               this.editorContent();
            }else{
              messageWarn(res.data.msg);
            }
          })
        }
      }
    }
  };
</script>