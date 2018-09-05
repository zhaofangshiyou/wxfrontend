// pages/regMasterCard/regMasterCard.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    station_list: [],
    isAgree: true,
    img_url: app.config.img_url,
    userInfo: {
      station_id: '',
      oilStation: '',
      unit_name: '',
      licence: '',
      user_name: '',
      ID: '',
      mobile: '',
      code: ''
    },
    isSubmit: false,
    codeText: '获取验证码',
    sendAgain: true,
  },
  //发送验证码
  sendCode() {
    if(this.isPoneAvailable(this.data.userInfo.mobile) && this.data.sendAgain) {
      let url = app.config.host+'/message';
      let params = {
        'mobile': this.data.userInfo.phone
      };
      let method = 'POST'
      httpService.sendRrquest(url,{},
      params,method).then(res=> {
        if(res.data.status === 0) {
          this.countDown(60);
          util.warnMsg('验证码已发送'); 
        }else if(res.data.status === 2){
          util.warnMsg('请输入正确的手机号'); 
        }else if(res.data.status === 3) {
          util.warnMsg('今日发送验证码次数超过5次'); 
        }else{
          util.warnMsg('发送验证码失败'); 
        }
      })
    }else if(!this.data.sendAgain){
      util.warnMsg('验证码已发送，稍后重试');
    }else{
      util.warnMsg('请输入正确的手机号码');
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
          codeText: timeout + "s后重发",
          sendAgain: false
        })
        timeout--;
      }
    }
  },
  //失去光标检测
  handleBlur(e) {
    switch(e.currentTarget.dataset.flag) {
      case 'licence':
        if (!this.isSlicenceAvailable(this.data.userInfo.licence)) {
          util.warnMsg('请输入正确的营业执照号');
        }
        break;
      case 'ID':
        if (!this.ValidatID(this.data.userInfo.ID)) {
          util.warnMsg('请输入正确的身份证');
        }
        break;
      case 'phone':
        if (!this.isPoneAvailable(this.data.userInfo.mobile)) {
          util.warnMsg('请输入正确的号码');
        }
        break;
    }
  },


  checkAvaliable(e) {
    switch(e.currentTarget.dataset.flag) {
      case 'unit':
        this.data.userInfo.unit_name = e.detail.value;
        break;
      case 'licence':
        this.data.userInfo.licence = e.detail.value;
        break;
      case 'name':
        this.data.userInfo.user_name = e.detail.value;
        break;
      case 'ID':
        this.data.userInfo.ID = e.detail.value;
        break;
      case 'phone':
        this.data.userInfo.mobile = e.detail.value;
        break;
      case 'code':
        this.data.userInfo.code = e.detail.value;
        break;
    }
    this.checkAll();
  },

  checkAll() {
    if (this.data.userInfo.unit_name.length > 0 &&
      this.isSlicenceAvailable(this.data.userInfo.licence) &&
      this.data.userInfo.user_name.length > 0 &&
      this.ValidatID(this.data.userInfo.ID) > 0 &&
      this.isPoneAvailable(this.data.userInfo.mobile) &&
      this.data.userInfo.code.length > 0 && 
      this.data.isAgree
    ) {
      this.setData({
        isSubmit: true
      })
    } else {
      this.setData({
        isSubmit: false
      })
    }
  },

  //获取数据
getData: function(lat,lon) {
  let that = this;
  let url = app.config.host + '/station';
  let data = {};
  let params = {
    'lat': lat,
    'lon': lon
  };
  let method = 'GET';
  httpService.sendRrquest(url,data,params,method).then(res => {
    // console.log(res);
    if(res.data.status === 0) {
      that.data.station_list = res.data.data.stations;
      let temp = [];
      that.setData({
        "userInfo.oilStation" : res.data.data.stations[0].name,
        "userInfo.station_id" : res.data.data.stations[0].id
      })
    }
  })
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

//验证营业执照
isSlicenceAvailable(number) {
  let patten = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
  if (patten.test(number)) {
    return true;
  } else {
    return false;
  }
},

  //跳转到取票油站
  getOil: function() {
    let station_str = JSON.stringify(this.data.station_list);
    wx.navigateTo({
      url: '../../pages/oilStation/oilStation?station_list='+ station_str
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  agree: function() {
    this.setData({
      isAgree: !this.data.isAgree
    })
    this.checkAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData();
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