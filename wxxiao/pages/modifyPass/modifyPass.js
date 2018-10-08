// pages/modifyPass/modifyPass.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisable: true,
    codeText: '获取验证码',
    sendAgain: true,
    formValue: {
      phone: "",
      code: "",
      pass: "",
      comPass: ""
    },
    img_url: app.config.img_url
  },
  formSubmit: function(e) {
    let url = app.config.host+'/card/password';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      code: e.detail.value.code,
      mobile: e.detail.value.phone,
      password: e.detail.value.pass
    };
    let method = 'PUT';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        util.warnMsg('修改成功');
        setTimeout( () => {
          wx.navigateBack();
        },2000);
      }else if(res.data.status === 2){
        util.warnMsg('验证码错误');
      }else{
        util.warnMsg('其他错误');
      }
    })
  },
   //发送验证码
   sendCode() {
    if(util.isPoneAvailable(this.data.formValue.phone) && this.data.sendAgain) {
      let url = app.config.host+'/message';
      let params = {
        'mobile': this.data.formValue.phone
      };
      let method = 'POST'
      httpService.sendRrquest(url,{},
      params,method).then(res=> {
        if(res.data.status === 0) {
          this.countDown(60);
          this.warnMsg('验证码已发送'); 
        }else if(res.data.status === 2){
          this.warnMsg('请输入正确的手机号'); 
        }else if(res.data.status === 3){
          this.warnMsg('发送验证码超过5次'); 
        }
        else{
          this.warnMsg('发送验证码失败'); 
        }
      })
    }else if(!this.data.sendAgain){
      this.warnMsg('验证码已发送，稍后重试');
    }else{
      this.warnMsg('请输入正确的手机号码');
    }
  },
  warnMsg: function(text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask:true
  })
  },
  checkPhone: function(e) {
    if(!util.isPoneAvailable(e.detail.value)) {
      this.warnMsg('您输入的手机号码不正确');
    }
  },
  //验证码倒计时
  countDown(timeout) {
    let timer;
    if(timer) {
      clearTimeout(timer);
    }else{
      timer = setTimeout(() => {
        this.countDown(timeout);
      },1000);
      if(timeout===0) {
        this.setData({
          codeText: '获取验证码',
          sendAgain: true
        })
        timeout = 60;
        clearTimeout(timer);
      }else{
        this.setData({
          codeText:  timeout + "s后重发",
          sendAgain: false
        })
        timeout--;
      }
    }
  },
  checkForm: function(e) {
    if(e.currentTarget.dataset.flag==1) {
      this.setData({
        "formValue.phone" : e.detail.value
      });
      if(this.checkAll()) {
        this.setData({
          "isDisable" : false
        });
      }else{
        this.setData({
          "isDisable" : true
        });
      }
    }else if(e.currentTarget.dataset.flag==2) {
      this.setData({
        "formValue.code" : e.detail.value
      });
      if(this.checkAll()) {
        this.setData({
          "isDisable" : false
        });
      }else{
        this.setData({
          "isDisable" : true
        });
      }
    }else if(e.currentTarget.dataset.flag==3) {
      this.setData({
        "formValue.pass" : e.detail.value
      });
      if(this.checkAll()) {
        this.setData({
          "isDisable" : false
        });
      }else{
        this.setData({
          "isDisable" : true
        });
      }
    }else {
      this.setData({
        "formValue.comPass" : e.detail.value
      });
      if(this.checkAll()) {
        this.setData({
          "isDisable" : false
        });
      }else{
        this.setData({
          "isDisable" : true
        });
      }
    }
  },
  checkAll: function() {
    if(util.isPoneAvailable(this.data.formValue.phone) &&
      (this.data.formValue.code.length > 0) &&
      (this.data.formValue.pass.length == 6) && 
      (this.data.formValue.comPass == this.data.formValue.pass)
  ){
    return true;
  }else{
    return false;
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})