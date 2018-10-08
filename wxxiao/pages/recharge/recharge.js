// pages/recharge/recharge.js
import util from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_num: 5000,
    isAgree: true,
    img_url: app.config.img_url,
    card_id: ''
  },
  select_money: function(e) {

    this.setData({
      money_num: e.currentTarget.dataset.moneynum,
      inputTxt: ""
    });
  },
  input_money: function(e) {
      this.setData({
        money_num: e.detail.value
      })
  },
  rechargeSubmit: function() {
      wx.request({
        url: app.config.host+'/pay/unifiedorder',
        data: {
            pay_target: 'charge',
            openid: wx.getStorageSync('open_id'),  // 这里正常项目不会只有openid一个参数
            total_fee: this.data.money_num,
            card_id: this.data.card_id
        },
        success: function(res){
            if(res.data.status === 0){
                var payModel = res.data;
                wx.requestPayment({
                    'timeStamp': payModel.timestamp,
                    'nonceStr': payModel.nonceStr,
                    'package': payModel.package,
                    'signType': 'MD5',
                    'paySign': payModel.paySign,
                    'success': function (res) {
                        wx.navigateTo({
                          url: '../../pages/succeCard/succeCrd?title=充值成功&type=6'
                        })
                    },
                    'fail': function (res) {
                      util.warnMsg(res.err_desc);
                    }
                })
            }else if(res.data.status === 3) {
              wx.navigateTo({
                url: '../../pages/openCard/openCard'
              })
            }
        },
        fail: function(){
        
        }
    })
  },
  agree: function() {
    this.setData({
      isAgree: !this.data.isAgree
    })
  },
  goDisconutDoc: function() {
    wx.navigateTo({
      url: '../../pages/discountDoc/discountDoc'
    })
  },
  openInvoice: function() {
    wx.navigateTo({
      url: '../../pages/invoices/invoices'
    })
  },
  shoFavourable: function() {
    this.alert.showDialog();
  },
  _confirmEvent: function() {
    this.alert.hideDialog();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.card_id) {
      this.data.card_id = options.card_id
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.alert = this.selectComponent("#alert");
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
