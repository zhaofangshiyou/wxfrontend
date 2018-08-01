// pages/payOrder/payOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    orderDetail: {},
    actualMonney: '',
    discountMoney: ''

  },
  paySubmi: function() {
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },

  printInvoice: function() {
    let trade_no = this.data.orderDetail.trade_no;
    wx.navigateTo({
      url: '../../pages/companyList/companyList?trade_no=' + trade_no
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderDetail = JSON.parse(options.orderDetail);
    this.setData({
      orderDetail: orderDetail,
      actualMonney: options.actualMonney,
      discountMoney: options.discountMoney
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