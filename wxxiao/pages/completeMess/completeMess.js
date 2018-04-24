// pages/completeMess/completeMess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSex: 1,
    carTypeBrand: '',
    showCar: false
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