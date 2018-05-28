// pages/zhaofangCardPay/zhaofangCardPay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conMoney: "",
    oil_index: 1,
    img_url: app.config.img_url
  },
  selectOil: function(e) {
    this.setData({
      oil_index: e.currentTarget.dataset.index
    })
  },
  bindKeyInput: function(e) {
    this.data.conMoney = e.detail.value;
  },
  nextSumit: function() {
    if(this.data.conMoney.length > 0) {
      wx.login({
        success: function(res) {
          wx.navigateTo({
            url: '../../pages/orderDetail/orderDetail'
          })
        }
      })
    }else{
      this.warnMsg('请输入充值金额');
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