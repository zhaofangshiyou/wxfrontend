// pages/openCard/openCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      realName: '',
      ID: '',
      sex: '请选择您的性别',
      cartType: '',
      carNumber: '',
      oilStation: '',
      password: '',
      phone: '',
      code: ''
    },
    show: {
      showSex: false,
      showCartType: false,
      showCartNumber: false,
      showOilStation: false,
      sexToggle: false
    },
    check: {
      checkName: false,
      checkID: false,
      checksex: false,
      chekCartType: false,
      checkCarNumber: false,
      checkOilStation: false,
      checkPassword: false,
      checkPhone: false,
      checkCode: false
    },
    codeText: '获取验证码',
    sendAgain: true
  },
  submitRegister(){
    console.log(this.data.userInfo);
  },
  //发送验证码
  sendCode() {
    console.log(this.data.sendAgain,this.data.userInfo.phone);
    if(this.isPoneAvailable(this.data.userInfo.phone) && this.data.sendAgain) {
      this.countDown(60);
    }else if(!this.data.sendAgain){
      this.warnMsg('稍后重试');
    }else{
      this.warnMsg('请输入手机号码');
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
  //性别选择相关
  ChooseSex: function(e){
    if(e.currentTarget.dataset.sex=='man') {
      console.log(e);
      this.setData({
        "userInfo.sex" : '男',
        "show.sexToggle": false,
        "show.showSex": true,
        "check.checksex": true
      })
      console.log(this.data.userInfo.sex);
    }else {
      this.setData({
        "userInfo.sex" : '女',
        "show.sexToggle": false,
        "show.showSex": true,
        "check.checksex": true
      })
    }
  },
  sexShow: function() {
    this.setData({
      "show.sexToggle": true
    })
  },
  hideSexBox: function() {
    this.setData({
      "show.sexToggle": false
    })
  },
  //判断是否输入正确
  checkMsg: function(event) {
    switch(event.currentTarget.dataset.flag){
      case 'realName': 
        if(event.detail.value != '') {
          this.setData({
            "userInfo.realName": event.detail.value,
            "check.checkName": true
          })
        }else{
          this.warnMsg('请输入您的真实姓名!');
        }
        break;
      case 'ID':
        if(!this.ValidatID(event.detail.value)){
          this.warnMsg('请输入正确的身份证号码！');
        }else{
          this.setData({
            "userInfo.ID": event.detail.value,
            "check.checkID": true
          })
        }
        break;
      case 'pass':
        if(event.detail.value.length == 6){
          this.setData({
            "userInfo.password": event.detail.value,
            "check.checkPassword": true
          })
        }else {
          this.warnMsg('请输入6位数字密码！'); 
        }
        break;
      case 'comfirmPass':
        if(event.detail.value != this.data.userInfo.password) {
          this.warnMsg('两次密码不一致'); 
        }
        break;
      case 'phone':
        if(!this.isPoneAvailable(event.detail.value)) {
          this.warnMsg('请输入正确的手机号'); 
        }else {
          this.setData({
            "userInfo.phone": event.detail.value,
            "check.checkPhone": true
          })
        }
      case 'code':
        if(event.detail.value == '') {
          this.warnMsg('请输入正确的验证码'); 
        }else {
          this.setData({
            "userInfo.phone": event.detail.value,
            "check.checkCode": true
          })
        }
    }
  },
  //验证身份证
  ValidatID(id){
    let patten = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(patten.test(id)){
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
  warnMsg: function(text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask:true
  })
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