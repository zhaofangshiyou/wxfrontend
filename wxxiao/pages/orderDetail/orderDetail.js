// pages/orderDetail/orderDetail.js

import httpService from '../../http/http.js';
import util from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    showBoard: false,
    passwordArr: [],
    payWay: 0,
    station_id: '',
    gun_id: '',
    oil_id: '',
    write_money: '',
    orderDetail: {},
    actualMonney: '',
    discountMoney: '',
    isDetails: false

  },
  forgetPass: function() {
    wx.navigateTo({
      url: '../../pages/modifyPass/modifyPass'
    })
  },
  changePay: function() {
    if(this.data.payWay==0) {
      this.data.payWay = 3;
      this.setData({
        payWay: this.data.payWay,
        actualMonney: this.data.orderDetail.OilMount,
        discountMoney: '0.00'
      })
    }else{
      this.data.payWay = 0;
      this.setData({
        payWay: this.data.payWay,
        actualMonney: this.data.orderDetail.PayMount,
        discountMoney: this.data.orderDetail.discount
      })
    }
  },
  paySubmit: function() {
    var self = this;
    if(this.data.payWay == 3) {
        wx.request({
          url: app.config.host+'/pay/unifiedorder',
          data: {
              openid: wx.getStorageSync('open_id'),  // 这里正常项目不会只有openid一个参数
              pay_target: 'pay',
              total_fee: this.data.actualMonney
          },
          success: function(res){
              if(res.data.status == 100){
                  var payModel = res.data;
                  wx.requestPayment({
                      'timeStamp': payModel.timestamp,
                      'nonceStr': payModel.nonceStr,
                      'package': payModel.package,
                      'signType': 'MD5',
                      'paySign': payModel.paySign,
                      'success': function (res) {
                          // wx.showToast({
                          //     title: '支付成功',
                          //     icon: 'success',
                          //     duration: 2000
                          // })
                          console.log(res);
                          let orderDetail = JSON.stringify(self.data.orderDetail);
                          wx.navigateTo({
                            url: '../../pages/payOrder/payOrder?orderDetail='+orderDetail + '&actualMonney=' + self.data.actualMonney + '&discountMoney=' + self.data.discountMoney
                          })
                      },
                      'fail': function (res) {
                        util.warnMsg(res.err_desc);
                      }
                  })
              }
          },
          fail: function(){
           
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
          let tempPass = '';
            for(let i=0; i<this.data.passwordArr.length; i++) {
            tempPass += this.data.passwordArr[i];
          }
          let url = app.config.host + '/pay/card';
          let data = {};
          let params = {
            'station_id': this.data.orderDetail.station_id,
            'gun_id': this.data.orderDetail.gun_id,
            'pay_money': this.data.actualMonney,
            'user_id': wx.getStorageSync('user_id'),
            'new_password': tempPass,
            'discount': this.data.orderDetail.discount,
            'pay_channel': 0,
            'oil_id': this.data.oil_id
          };
          let method = 'POST';
          httpService.sendRrquest(url,data,params,method).then(res => {
            if(res.data.status === 0) {
              let orderDetail = JSON.stringify(this.data.orderDetail);
              wx.navigateTo({
                url: '../../pages/payOrder/payOrder?orderDetail='+orderDetail + '&actualMonney=' + this.data.actualMonney + '&discountMoney=' + this.data.discountMoney
              })
            }else if(res.data.status === 2){
              util.warnMsg('支付失败');
            }else if(res.data.status === 3) {
              util.warnMsg('付款失败，余额不足');
            }else if(res.data.status === 4) {
              util.warnMsg('无流水信息');
            }else if(res.data.status === 5) {
              util.warnMsg('密码错误,请重试');
            }else if(res.data.status === 6) {
              util.warnMsg('有枪选择错误');
            }else if(res.data.status === 7) {
              util.warnMsg('油站选择错误');
            }else{
              util.warnMsg('其他错误');
            }
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
    // this.data.station_id = options.station_id;
    // this.data.gun_id = options.gun_id;
    // this.data.write_money = options.write_money;
    this.data.oil_id = options.oil_id
    let tempDetail = JSON.parse(options.order_detail);
    // this.getDetail();
    this.setData({
      orderDetail: tempDetail,
      actualMonney: tempDetail.PayMount,
      discountMoney: tempDetail.discount
    })
  },

  //获取订单详情信息
  getDetail: function() {
    let url = app.config.host + '/pay/flow/order';
    let data = {};
    let params = {
      'station_id': this.data.station_id,
      'gun_id': this.data.gun_id,
      'write_money': this.data.write_money,
      'oil_id': this.data.oil_id,
      'user_id': wx.getStorageSync('user_id')
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          orderDetail: res.data.data
        })
      }else if(res.data.status === 2){
        util.warnMsg('油站选择错误');
      }else if(res.data.status === 3) {
        util.warnMsg('油枪选择错误');
      }else if(res.data.status === 4) {
        util.warnMsg('无流水信息');
      }else {
        util.warnMsg('其他错误');
      }
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