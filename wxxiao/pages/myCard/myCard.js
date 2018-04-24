// pages/myCard/myCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      {name:'个人卡',notice:'个人办理的加油卡用户请选择',iconUrl: '../../images/home_icon_zfcar.png',link: '../../pages/openCard/openCard'},
      {name:'单位卡',notice:'持有单位分配的加油卡用户请选择',iconUrl: '../../images/home_icon_zfcar.png',link: '../../pages/bindCard/bindCard'},
    ]
  },
  cardDetail: function(e) {
    console.log(e.currentTarget.dataset.link);
    wx.navigateTo({
      url: e.currentTarget.dataset.link
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