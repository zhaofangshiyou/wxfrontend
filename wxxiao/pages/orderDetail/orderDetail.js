// pages/orderDetail/orderDetail.js

import httpService from '../../http/http.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    showBoard: false,
    passwordArr: [],
    payWay: 1,
    station_id: '',
    gun_id: '',
    orderDetail: {},
  },
  forgetPass: function() {
    wx.navigateTo({
      url: '../../pages/modifyPass/modifyPass'
    })
  },
  changePay: function() {
    if(this.data.payWay==1) {
      this.data.payWay = 2;
      this.setData({
        payWay: this.data.payWay
      })
    }else{
      this.data.payWay = 1;
      this.setData({
        payWay: this.data.payWay
      })
    }
  },
  paySubmit: function() {
    var self = this;
    if(this.data.payWay == 2) {
        wx.request({
          url: 'https://api.zfsyonline.com/v1/pay/unifiedorder',
          data: {
              openid: wx.getStorageSync('open_id')  // 这里正常项目不会只有openid一个参数
          },
          success: function(res){
              if(res.data.status == 100){
                  var payModel = res.data;
                  console.log(res);
                  wx.requestPayment({
                      'timeStamp': payModel.timestamp,
                      'nonceStr': payModel.nonceStr,
                      'package': payModel.package,
                      'signType': 'MD5',
                      'paySign': payModel.paySign,
                      'success': function (res) {
                          wx.showToast({
                              title: '支付成功',
                              icon: 'success',
                              duration: 2000
                          })
                      },
                      'fail': function (res) {
                        console.log(res);
                      }
                  })
              }
          },
          fail: function(){
            console.log(2222);
          }
      })
    }else{
     this.setData({
      showBoard: true
     })
    }  

  },
  hideBoard: function() {
    this.data.passwordArr.length=0;
    this.setData({
      showBoard: false,
      passwordArr: this.data.passwordArr
    })
  },
  inputPass: function(e) {
    if(e.currentTarget.dataset.number == 'deleteAll'){
      this.data.passwordArr.length = 0;
      this.setData({
        passwordArr: this.data.passwordArr
      })
    }else if(e.currentTarget.dataset.number == 'delete'){
      this.data.passwordArr.pop();
      this.setData({
        passwordArr: this.data.passwordArr
      })
    }else{
      if(this.data.passwordArr.length < 6) {
        this.data.passwordArr.push(e.currentTarget.dataset.number);
        if(this.data.passwordArr.length==6) {
          wx.navigateTo({
            url: '../../pages/payOrder/payOrder'
          })
        }
        this.setData({
          passwordArr: this.data.passwordArr
        })
      }else{
        return false;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.station_id = options.station_id;
    this.data.gun_id = options.gun_id;
    this.getDetail();
  },

  //获取订单详情信息
  getDetail: function() {
    let url = app.config.host + '/pay/flow/order';
    let data = {};
    let params = {
      'station_id': this.data.station_id,
      'gun_id': this.data.gun_id
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          orderDetail: res.data.data,
          gun_id: this.data.gun_id
        })
      }
      console.log(this.data.orderDetail);
    })

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