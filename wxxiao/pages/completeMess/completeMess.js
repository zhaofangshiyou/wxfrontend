// pages/completeMess/completeMess.js
import httpService from '../../http/http.js';
import { CheckStr,objectNull } from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSex: 1,
    carTypeBrand: '',
    showCar: false,
    realName: '',
    IDcard: '',
    carNum: '',
    img_url: app.config.img_url
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
  },
  //H获取用户信息
  getUserInfo: function() {
    let url = app.config.host+'/user';
    let data = {userId: wx.getStorageSync('user_id')};
    let method = 'GET';
    httpService.sendRrquest(url,data,{},method)
      .then(res => {
        if(res.data.status === 0) {
          var user = res.data.data.user;
          objectNull(user);
          if(user.sex) {
            this.setData({
              chooseSex: user.sex
            })
          }
          this.setData({
            carTypeBrand: user.car_type,
            IDcard: user.id_card,
            showCar: true,
            carNum: user.car_num,
            realName: user.name
         })
        }
      })
  },
  submitComplete: function() {
    var that = this;
    if(this.data.IDcard) {
      if(!this.ValidatID(this.data.IDcard)) {
        this.warnMsg('请输入正确的身份证');
        return false;
      }
    }else if(this.data.carNum) {
      if(!this.validaCar(this.data.carNum)) {
          this.warnMsg('请输入正确的车牌号');
          return false;
      }
    }
    let url = app.config.host+'/user';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      name: that.data.realName,
      sex: that.data.chooseSex,
      id_card: that.data.IDcard,
      car_num: that.data.carNum,
      car_type: that.data.carTypeBrand
    };
    let method = 'PUT';
    httpService.sendRrquest(url,data,params,method).then( res => {
      if(res.data.status === 0) {
        setTimeout(() => {
          this.warnMsg('修改成功');
        },1000)
        this.getUserInfo();
      }
    })
  },
  checkMsg: function(event) {
    switch(event.currentTarget.dataset.flag) {
      case 'realName': 
        this.data.realName = event.detail.value;
        break;
      case 'ID':
        if(!this.ValidatID(event.detail.value)) {
          this.warnMsg('请输入正确的身份证号码！');
        }
        this.data.IDcard = event.detail.value;
        break;
      case 'carNum':
        if(!this.validaCar(event.detail.value)) {
          this.warnMsg('请输入正确的车牌号！');
        }
        this.data.carNum = event.detail.value;
        break;
    }
  },
  saveID: function(event) {
    if(this.ValidatID(event.detail.value)) {
      this.data.IDcard = event.detail.value;
    }else if(event.detail.value.length == 0) {
      this.data.IDcard = '';
    }
  },
  changeSex: function(e) {
    if(e.currentTarget.dataset.sex==1){
      this.setData({
        chooseSex: 1
      })
    }else{
      this.setData({
        chooseSex: 2
      })
    }
  },
  cardType: function() {
    wx.navigateTo({
      url: '../../pages/carType/carType'
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
  //验证车牌号
  validaCar(carNumber) {
    let patten = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    if(patten.test(carNumber)){
      return true;
    }else{
      return false;
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