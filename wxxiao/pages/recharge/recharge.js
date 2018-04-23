// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_num: 5000,
    isAgree: true
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
    wx.navigateTo({
      url: '../../pages/succeCard/succeCrd'
    })
  },
  agree: function() {
    this.setData({
      isAgree: !this.data.isAgree
    })
  },
  openInvoice: function() {
    wx.navigateTo({
      url: '../../pages/invoices/invoices'
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
    console.log(234);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(123);
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