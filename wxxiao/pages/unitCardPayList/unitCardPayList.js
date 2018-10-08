// pages/unitCardPayList/unitCardPayList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unitList = JSON.parse(options.unitCard);
    this.setData({
      list: unitList
    })
  },

  backPay(e) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];

    prevPage.setData({
　　　'card_id': e.currentTarget.dataset.id,
      'company': e.currentTarget.dataset.company
　　});
    wx.navigateBack({//返回
      delta:1
    })
  },

  setDefault(e) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    prevPage.getData()
    console.log(e)
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