// pages/openCard/openCard.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    station_list: [],
    isAgree: true,
    userInfo: {
      realName: '',
      ID: '',
      sex: '请选择您的性别',
      cartType: '',
      carNumber: '',
      oilStation: '',
      station_id: '',
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
      checkComPassword: false,
      checkCode: false
    },
    codeText: '获取验证码',
    sendAgain: true,
    img_url: app.config.img_url
  },
  submitRegister(){
    let url = app.config.host+'/card';
    let params = {
      'user_id': wx.getStorageSync('user_id'),
      'password': this.data.userInfo.password,
      'unit_card_type': 0,
      'code': this.data.userInfo.code,
      'mobile': this.data.userInfo.phone,
      'station_id': this.data.userInfo.station_id,
    };
    let method = 'POST';
    httpService.sendRrquest(url,{},params,method).then(res => {
      if(res.data.status === 0) {
        wx.navigateTo({
          url: '../../pages/succeCard/succeCrd?title=开卡成功&type=0&'
        })
      }else if(res.data.status === 2){
        this.warnMsg('请输入正确的手机号');
      }else if(res.data.status === 3) {
        this.warnMsg('请输入正确的验证码');
      }
    })
    
  },
  //跳转到取票油站
  getOil: function() {
    let station_str = JSON.stringify(this.data.station_list);
    wx.navigateTo({
      url: '../../pages/oilStation/oilStation?station_list='+ station_str
    })
  },
  //发送验证码
  sendCode() {
    if(this.isPoneAvailable(this.data.userInfo.phone) && this.data.sendAgain) {
      let url = app.config.host+'/message';
      let params = {
        'mobile': this.data.userInfo.phone
      };
      let method = 'POST'
      httpService.sendRrquest(url,{},
      params,method).then(res=> {
        if(res.data.status === 0) {
          this.countDown(60);
          this.warnMsg('验证码已发送'); 
        }else if(res.data.status === 2){
          this.warnMsg('请输入正确的手机号'); 
        }else{
          this.warnMsg('发送验证码失败'); 
        }
      })
    }else if(!this.data.sendAgain){
      this.warnMsg('验证码已发送，稍后重试');
    }else{
      this.warnMsg('请输入正确的手机号码');
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
  //性别选择相关
  ChooseSex: function(e){
    if(e.currentTarget.dataset.sex=='man') {
      this.setData({
        "userInfo.sex" : '男',
        "show.sexToggle": false,
        "show.showSex": true,
        "check.checksex": true
      })
    }else {
      this.setData({
        "userInfo.sex" : '女',
        "show.sexToggle": false,
        "show.showSex": true,
        "check.checksex": true
      })
    }
  },
  agree: function() {
    this.setData({
      isAgree: !this.data.isAgree
    })
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
  checkPhoneErroe: function(event) {
    if(!this.isPoneAvailable(event.detail.value)) {
      this.warnMsg('请输入正确的手机号'); 
      this.setData({
        "check.checkPhone": false
      })
    }
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
          this.setData({
            "check.checkPassword": false
          })
          this.warnMsg('请输入6位数字密码！');
        }
        break;
      case 'comfirmPass':
        if(event.detail.value != this.data.userInfo.password) {
          this.warnMsg('两次密码不一致');
          this.setData({
            "check.checkComPassword": false
          })
        }else{
          this.setData({
            "check.checkComPassword": true
          })
        }
        break;
      case 'phone':
        if(event.detail.value.length == 11) {
          if(!this.isPoneAvailable(event.detail.value)) {
            this.warnMsg('请输入正确的手机号'); 
            this.setData({
              "check.checkPhone": false
            })
          }else {
            this.setData({
              "userInfo.phone": event.detail.value,
              "check.checkPhone": true
            })
          }
        }else{

        }
        break;
      case 'code':
        if(event.detail.value.length == 0 ) {
          this.warnMsg('请输入正确的验证码'); 
          this.setData({
            "check.checkCode": false
          })
        }else {
          this.setData({
            "userInfo.code": event.detail.value,
            "check.checkCode": true
          })
        }
        break;
      default:
        return;
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

  //获取初始化数据
  getInitData: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        let url = app.config.host + '/station';
        let data = {};
        let params = {
          'lat': res.latitude,
          'lon': res.longitude
        };
        let method = 'GET';
        httpService.sendRrquest(url,data,params,method).then(res => {
          if(res.data.status === 0) {
            that.data.station_list = res.data.data.stations;
            let temp = [];
            for(let i=1; i< parseInt(res.data.data.stations[0].oil_gum_nums)+1; i++ ) {
              temp.push(i);
            }
            that.setData({
              "userInfo.oilStation" : res.data.data.stations[0].name,
              "userInfo.station_id" : res.data.data.stations[0].id
            })
          }
        })
      }
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
    this.getInitData();
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