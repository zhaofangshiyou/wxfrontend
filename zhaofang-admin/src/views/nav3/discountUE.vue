<template>
  <div class="components-container">
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
     <button @click="getUEContent()" class="submit">提交</button>
  </div>
</template>
<style>
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
  import UE from '../../components/ue.vue';
  export default {
    components: {UE},
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    }
  };
</script>