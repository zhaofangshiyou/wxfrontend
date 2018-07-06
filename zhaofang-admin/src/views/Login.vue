<template>
    <div class="login_bg">
      <div class="login_title">
        <img class="logo" width="100%" src="../assets/logo_title.png" align="absmiddle" />
      </div>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">用户登录</h3>
        <div class="welcome_box">
          <div class="tip"></div>
          <div class="welcome_text">欢迎登录兆方后台管理系统</div>
          <div class="tip"></div>
        </div>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
      <div class="login_bottom">Copyright © 2012-2018 深圳市兆方石油化工股份有限公司 版权所有</div>
    </div>
</template>

<script>
  import { login } from '../api/api';
  import { messageWarn } from '../common/js/commonMethod';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        }
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        let params = {
          login: this.ruleForm2.account,
          password:  this.ruleForm2.checkPass
        }
        login(params).then(res => {
          if(res.data.status === 0) {
            localStorage.setItem('user_id', res.data.data.id);
             _this.$router.push({ path: '/welcome' });
          }else{
            messageWarn(res.data.msg)
          }
        })
        
        // this.$refs.ruleForm2.validate((valid) => {

        //   if (valid) {
          
            //_this.$router.replace('/table');
            // this.logining = true;
            //NProgress.start();
            //var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            // requestLogin(loginParams).then(data => {
            //   this.logining = false;
            //   //NProgress.done();
            //   let { msg, code, user } = data;
            //   if (code !== 200) {
            //     this.$message({
            //       message: msg,
            //       type: 'error'
            //     });
            //   } else {
            //     sessionStorage.setItem('user', JSON.stringify(user));
            //     this.$router.push({ path: '/oil_init' });
            //   }
            // });
            
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login_bg{
    background: url('../assets/bg.png') no-repeat;
    background-size: 100% auto;
    position: absolute;
    width: 100%;
    .login_bottom{
      margin-top: 120px;
      text-align: center;
      color: #949494;
    }
    .login_title{
      margin: 250px 0 auto;
      text-align: center;
      padding: 0;
      line-height: 0;
      height: 42px;
      .logo{
        display: inline-block;
        width: auto;
        height: 42px;
        line-height: 42px;
      }
    }
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 50px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow:0px 0px 24px rgba(113,167,242,0.6);
    .welcome_box{
      width: 100%;
      display: flex;
      height: 28px;
      margin: 0px auto 40px auto;
      .tip{
        flex: 1;
        border-top: 1px solid rgba(189,189,189,1);
        margin-top: 14px;
      }
      .welcome_text{
        padding: 0 5px;
        line-height: 28px;
      }
    }
    .title {
      text-align: center;
      color: #4E9FF8;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

</style>