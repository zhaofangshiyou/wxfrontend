// pages/modifyPass/modifyPass.js
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
    }
  },
   //发送验证码
   sendCode() {
    if(this.isPoneAvailable(this.data.formValue.phone) && this.data.sendAgain) {
      this.countDown(60);
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
    if(!this.isPoneAvailable(e.detail.value)) {
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
          codeText: "重新发送(" + timeout + ")",
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
    if(this.isPoneAvailable(this.data.formValue.phone) &&
      (this.data.formValue.code.length > 0) &&
      (this.data.formValue.pass.length == 6) && 
      (this.data.formValue.comPass == this.data.formValue.pass)
  ){
    return true;
  }else{
    return false;
  }
  },
  //验证手机号
  isPoneAvailable(pone) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
     return false;
    } else {
     return true;
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